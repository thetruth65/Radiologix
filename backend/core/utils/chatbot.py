# core/utils/chatbot.py
from langchain_community.llms import HuggingFacePipeline
from langchain.prompts import PromptTemplate
from transformers import AutoModelForCausalLM, AutoTokenizer, pipeline
from transformers import BitsAndBytesConfig
import torch
import os
from django.conf import settings
import logging
import threading

logger = logging.getLogger(__name__)

CONDITION_INFO = {
    'Normal': 'No abnormalities detected in the chest X-ray.',
    'Pneumonia': 'An infection that inflames the air sacs in one or both lungs.',
    'Tuberculosis': 'A bacterial infection that primarily affects the lungs.',
    'Cardiomegaly': 'An enlarged heart, which can be a sign of various heart conditions.',
    'Effusion': 'Fluid accumulation in the pleural space around the lungs.',
    'Infiltration': 'Abnormal substances accumulated in the lung tissues.',
    'Mass': 'An abnormal growth or lump that may require further investigation.',
    'Nodule': 'A small, round growth in the lung that appears as a white spot on X-rays.',
    'Atelectasis': 'A complete or partial collapse of a lung or lobe of a lung.',
    'Pneumothorax': 'Air or gas in the pleural cavity causing lung collapse.',
    'Pleural_Thickening': 'Thickening of the pleural space from excess fluid or scarring.',
    'Consolidation': 'Lung tissue filled with liquid instead of air.',
    'Emphysema': 'A lung condition that causes shortness of breath.',
    'Fibrosis': 'Scarring of lung tissue that can interfere with breathing.',
    'Edema': 'Excess fluid in the lungs or other body tissues.',
    'Hernia': 'Protrusion of an organ through the structure that normally contains it.',
}

model = None
tokenizer = None
pipe = None
model_loaded = False
model_loading = False
lock = threading.Lock()

def initialize_model_async():
    global model_loading
    with lock:
        if not model_loading:
            model_loading = True
            thread = threading.Thread(target=_load_model)
            thread.daemon = True
            thread.start()

def _load_model():
    global model, tokenizer, pipe, model_loaded, model_loading
    try:
        logger.info("Loading TinyLlama model...")
        model_id = "TinyLlama/TinyLlama-1.1B-Chat-v1.0"
        hf_token = getattr(settings, 'HUGGINGFACE_API_TOKEN', None)
        
        if not hf_token:
            logger.error("No Hugging Face token found")
            model_loading = False
            return
        
        tokenizer = AutoTokenizer.from_pretrained(model_id, token=hf_token)
        
        quantization_config = BitsAndBytesConfig(
            load_in_4bit=True,
            bnb_4bit_compute_dtype=torch.bfloat16,
            bnb_4bit_quant_type="nf4",
            bnb_4bit_use_double_quant=True
        )
        
        model = AutoModelForCausalLM.from_pretrained(
            model_id,
            token=hf_token,
            torch_dtype=torch.bfloat16,
            quantization_config=quantization_config,
            device_map="auto"
        )
        
        pipe = pipeline(
            "text-generation",
            model=model,
            tokenizer=tokenizer,
            max_new_tokens=200,
            temperature=0.7,
            top_p=0.9,
            repetition_penalty=1.2,
            return_full_text=False
        )
        
        model_loaded = True
        logger.info("TinyLlama model loaded successfully")
    except Exception as e:
        logger.error(f"Error loading model: {str(e)}")
    finally:
        model_loading = False

def get_chatbot_response(message, predicted_class):
    global model_loaded
    if not model_loaded and not model_loading:
        initialize_model_async()
    
    if not model_loaded:
        return f"Your X-ray shows {predicted_class}. {CONDITION_INFO.get(predicted_class, 'Please consult a doctor.')}"
    
    try:
        # Define the prompt template
        prompt_template = PromptTemplate(
            input_variables=["condition", "info", "message"],
            template="""You are Radiologix, an AI radiology assistant specializing in explaining medical conditions based on X-ray results.

Context information:
- Patient condition from X-ray: {condition}
- Medical information about the condition: {info}
- User's question: {message}

Instructions:
1. Respond directly to the user's question without repeating it back
2. Be concise, clear, and compassionate in your response
3. Focus on providing helpful information about their condition
4. Only answer as Radiologix, do not include or simulate user messages
5. Do not prefix your response with "Radiologix:" or any other identifier

Your response:"""
        )
        
        # Format the prompt template with the input variables
        formatted_prompt = prompt_template.format(
            condition=predicted_class,
            info=CONDITION_INFO.get(predicted_class, "No specific information available."),
            message=message
        )
        
        # Pass the formatted string to the pipe
        response = pipe(formatted_prompt)[0]['generated_text']
        return response.strip()
    except Exception as e:
        logger.error(f"Chatbot error: {str(e)}")
        return f"Sorry, I'm having trouble responding. Your X-ray shows {predicted_class}. {CONDITION_INFO.get(predicted_class, '')}"

initialize_model_async()