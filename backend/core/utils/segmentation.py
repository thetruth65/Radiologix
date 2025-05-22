# core/utils/segmentation.py
import cv2
import numpy as np
import os
import tempfile
from PIL import Image
import logging

logger = logging.getLogger(__name__)

def apply_segmentation(image_file, predicted_class):
    try:
        img_name = os.path.basename(image_file.name)
        segmented_filename = f"segmented_{img_name}"
        # Use the system temp directory for stateless operation
        temp_dir = tempfile.gettempdir()
        segmented_dir = os.path.join(temp_dir, 'segmented_images')
        os.makedirs(segmented_dir, exist_ok=True)
        full_path = os.path.join(segmented_dir, segmented_filename)

        img = Image.open(image_file).convert('L')
        img_np = np.array(img)
        img_resized = cv2.resize(img_np, (224, 224))

        # Placeholder for U-Net segmentation (pretrained model)
        # For now, use improved thresholding based on condition
        if predicted_class in ['Pneumonia', 'Tuberculosis', 'Infiltration']:
            _, thresh = cv2.threshold(img_resized, 150, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)
        elif predicted_class in ['Cardiomegaly', 'Effusion']:
            _, thresh = cv2.threshold(img_resized, 100, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)
        else:
            _, thresh = cv2.threshold(img_resized, 120, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)

        heatmap = cv2.applyColorMap(thresh, cv2.COLORMAP_JET)
        alpha = 0.6
        original_color = cv2.cvtColor(img_resized, cv2.COLOR_GRAY2BGR)
        blend = cv2.addWeighted(original_color, 1 - alpha, heatmap, alpha, 0)

        cv2.imwrite(full_path, blend)
        logger.info(f"Segmentation saved to {full_path}")
        return full_path
    except Exception as e:
        logger.error(f"Segmentation error: {str(e)}")
        return None