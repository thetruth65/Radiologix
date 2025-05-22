# core/utils/model_inference.py
import torch
import torchvision.transforms as transforms
from torchvision.models import efficientnet_b1
from PIL import Image
import os
from django.conf import settings
import logging

logger = logging.getLogger(__name__)

CLASSES = ['Pneumonia', 'Cardiomegaly', 'Effusion', 
           'Infiltration', 'Mass', 'Nodule', 'Atelectasis', 'Pneumothorax', 
           'Pleural_Thickening', 'Consolidation', 'Emphysema', 'Fibrosis', 'Edema', 'Hernia']

# Global variables to hold the model and device
model = None
model_loaded = False
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

# Image transformation pipeline
transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225]),
])

def load_model():
    global model, model_loaded, device
    if not model_loaded:
        try:
            logger.info("Loading EfficientNet-B1 model...")
            # Load EfficientNet-B1 model with weights=None (no pretrained weights)
            model = efficientnet_b1(weights=None)
            num_classes = len(CLASSES)
            # Update the classifier to match the number of classes
            in_features = model.classifier[1].in_features
            model.classifier[1] = torch.nn.Linear(in_features, num_classes)
            
            # Load trained weights
            model_path = os.path.join(settings.BASE_DIR, 'models', 'best_model.pth')
            if not os.path.exists(model_path):
                logger.error(f"Model not found at {model_path}")
                raise Exception(f"Model file not found at {model_path}")
            
            model.load_state_dict(torch.load(model_path, map_location=device, weights_only=True))
            model = model.to(device)
            model.eval()
            model_loaded = True
            logger.info("EfficientNet-B1 model loaded successfully")
        except Exception as e:
            logger.error(f"Error loading model: {str(e)}")
            raise

def predict_image(image_file):
    """
    Predict the class of an X-ray image.
    Args:
        image_file: File object (uploaded image)
    Returns:
        str: Predicted class name
    """
    try:
        # Ensure the model is loaded
        if not model_loaded:
            load_model()

        # Read and preprocess the image
        img = Image.open(image_file).convert('RGB')
        img_tensor = transform(img).unsqueeze(0).to(device)
        
        # Predict
        with torch.no_grad():
            outputs = model(img_tensor)
            probabilities = torch.nn.functional.softmax(outputs, dim=1)
            confidence, predicted = torch.max(probabilities, 1)
        
        predicted_class = CLASSES[predicted.item()]
        if confidence.item() < 0.5:
            return "Normal"
        
        return predicted_class
    except Exception as e:
        logger.error(f"Inference error: {str(e)}")
        raise Exception(f"Failed to predict image: {str(e)}")

# Load the model at startup
load_model()

