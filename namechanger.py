import os

def rename_images(folder_path):
    image_extensions = ('.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp')
    files = [f for f in os.listdir(folder_path) if f.lower().endswith(image_extensions)]
    files.sort()  # Optional: Sort alphabetically

    for index, filename in enumerate(files, start=1):
        new_name = f"photo{index}.jpeg"
        src = os.path.join(folder_path, filename)
        dst = os.path.join(folder_path, new_name)
        os.rename(src, dst)
        print(f"Renamed: {filename} -> {new_name}")

rename_images("images")
