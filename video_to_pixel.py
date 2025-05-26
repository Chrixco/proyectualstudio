import cv2
import moviepy as mp
import os

def pixelate_video(input_path, output_path=None, pixel_width=128, pixel_height=64, grayscale=False):
    if output_path is None:
        base_name = os.path.splitext(os.path.basename(input_path))[0]
        mode = "bw" if grayscale else "colour"
        dims = f"{pixel_width}x{pixel_height}"
        output_path = f"media/{base_name}_{mode}_{dims}.mp4"
    # Load video
    clip = mp.VideoFileClip(input_path)
    fps = clip.fps

    # Temporary output directory
    temp_dir = "frames"
    os.makedirs(temp_dir, exist_ok=True)

    frame_paths = []

    print("Processing frames...")

    for i, frame in enumerate(clip.iter_frames()):
        # Resize frame to pixel dimensions
        small = cv2.resize(frame, (pixel_width, pixel_height), interpolation=cv2.INTER_LINEAR)
        # Scale it back up to original size (pixelated)
        pixelated = cv2.resize(small, (frame.shape[1], frame.shape[0]), interpolation=cv2.INTER_NEAREST)
        if grayscale:
            pixelated = cv2.cvtColor(pixelated, cv2.COLOR_RGB2GRAY)
            pixelated = cv2.cvtColor(pixelated, cv2.COLOR_GRAY2RGB)
        out_path = f"{temp_dir}/frame_{i:05d}.png"
        cv2.imwrite(out_path, pixelated)
        frame_paths.append(out_path)

    print("Creating video...")

    # Reassemble video
    frame_clip = mp.ImageSequenceClip(frame_paths, fps=fps)
    frame_clip.write_videofile(output_path, codec='libx264', audio=False)

    # Cleanup
    for f in frame_paths:
        os.remove(f)
    os.rmdir(temp_dir)

    print("Done.")

input_file = "media/Sequence blue.mp4"

# Black and white output
#pixelate_video(input_file, pixel_width=128, pixel_height=64, grayscale=True)

# Colour output
pixelate_video(input_file, pixel_width=128, pixel_height=64, grayscale=False)