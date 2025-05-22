# core/views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from .utils.model_inference import predict_image
from .utils.segmentation import apply_segmentation
from .utils.chatbot import get_chatbot_response
from django.core.files.uploadedfile import InMemoryUploadedFile
from django.core.files.base import ContentFile
from django.http import FileResponse
from PIL import Image
import io
import os
import tempfile
import logging
import base64
logger = logging.getLogger(__name__)

class AnalyseImageView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        if 'image' not in request.FILES:
            return Response({'error': 'No image provided'}, status=status.HTTP_400_BAD_REQUEST)

        image = request.FILES['image']
        try:
            # Predict class
            predicted_class = predict_image(image)

            # Reset file pointer for segmentation
            image.seek(0)
            # Segment image and get path
            segmented_path = apply_segmentation(image, predicted_class)

            # Read segmented image as bytes
            with open(segmented_path, "rb") as f:
                segmented_bytes = f.read()

            # Return original image and segmented image as base64 or as file responses
            image.seek(0)
            original_bytes = image.read()
            original_b64 = base64.b64encode(original_bytes).decode('utf-8')
            segmented_b64 = base64.b64encode(segmented_bytes).decode('utf-8')
            
            return Response({
                'predicted_class': predicted_class,
                'original_image': original_b64,
                'segmented_image': segmented_b64,
            }, status=status.HTTP_200_OK)
        except Exception as e:
            logger.error(f"Error in AnalyseImageView: {str(e)}")
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class ChatbotView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        message = request.data.get('message')
        predicted_class = request.data.get('predicted_class')

        if not message or not predicted_class:
            return Response({'error': 'Message and predicted_class are required'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            response = get_chatbot_response(message, predicted_class)
            return Response({
                'response': response,
            }, status=status.HTTP_200_OK)
        except Exception as e:
            logger.error(f"Error in ChatbotView: {str(e)}")
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)




