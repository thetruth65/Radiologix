# Radiologix: AI-Powered Radiology Assistant

## Overview
Radiologix is a full-stack AI radiology tool that analyzes chest X-rays, classifies 14 conditions, and segments affected areas with heatmaps. It uses EfficientNet-B1 (72.37% test accuracy), a fine-tuned Tiny Llama model with RAG for support. Users can upload X-ray images, receive segmented reports.

## Features
- **Classification**: Detects 14 chest X-ray conditions (e.g., Atelectasis, Pneumonia) using the NIH Chest X-ray dataset.
- **Segmentation**: Generates heatmaps for affected areas.(using UNET)
- **Full-Stack**: Built with React+Vite, Django, and SQL.
- **Performance**:
  - Train Accuracy: 92%
  - Validation Accuracy: 72%
  - Test Accuracy: 72.37%
  - See [Classification Report](#classification-report) for details.

## Demo
![Screenshot 2025-05-22 113700](https://github.com/user-attachments/assets/1d28e001-f08d-4725-b667-dde95bfb9f0a)
![Screenshot 2025-05-22 113743](https://github.com/user-attachments/assets/a13db53a-9f43-4d62-b574-e66b05e00d4f)
![Screenshot 2025-05-22 113810](https://github.com/user-attachments/assets/965d94a1-261d-4534-83e0-89c6f165aa80)
![Screenshot 2025-05-22 113842](https://github.com/user-attachments/assets/a7392354-b00e-426f-88c7-410864d78c17)
![Screenshot 2025-05-22 113903](https://github.com/user-attachments/assets/ed726855-357f-4a04-9165-9cee1e33717c)
![Screenshot 2025-05-22 113930](https://github.com/user-attachments/assets/f83ddb19-aead-4dff-a84b-89b6c83e4910)
![Screenshot 2025-05-22 114004](https://github.com/user-attachments/assets/b7f5f1c2-bcf8-40ed-84b9-d3746f8de9a5)
![learning_curves](https://github.com/user-attachments/assets/cd47aec5-9ffe-4810-8dce-fb8cc4f1348a)
![confusion_matrix](https://github.com/user-attachments/assets/c8481cb7-59d8-4e70-b021-50c37f1b2b31)
![class_distribution](https://github.com/user-attachments/assets/72c1efc3-efa4-48b2-ba49-8059590a89cd)


## Installation
1. Clone the repo:
   ```bash
   git clone https://github.com/thetruth65/Radix_Assist.git
