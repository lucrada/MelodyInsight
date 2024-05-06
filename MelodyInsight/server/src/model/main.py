import subprocess
import os

def run_dejavu_recognition():
    try:
        command = ['python', 'src/model/dejavu/dejavu.py', '--recognize', 'file', 'src/model/music/song.mp3']
        
        subprocess.run(command, check=True)
        
    except subprocess.CalledProcessError as e:
        print("Error running dejavu:", e)

if __name__ == "__main__":
    run_dejavu_recognition()
