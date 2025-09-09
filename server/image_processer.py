import os
import easyocr

# Path to the uploads folder
uploads_folder = os.path.join("..", "backend", "uploads")

# Initialize EasyOCR reader
reader = easyocr.Reader(['en'])

# Example: Read a specific image from the uploads folder
image_name = "bill.jpg"  # Replace with the name of your image
image_path = os.path.join(uploads_folder, image_name)
result = reader.readtext(image_path, detail=0)
print(result)