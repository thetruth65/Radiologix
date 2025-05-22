# core/urls.py
from django.urls import path
from .views import AnalyseImageView, ChatbotView

urlpatterns = [
    path('analyse/', AnalyseImageView.as_view(), name='analyse'),
    path('chatbot/', ChatbotView.as_view(), name='chatbot'),
]
