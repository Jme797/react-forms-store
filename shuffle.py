import os
import shutil
import subprocess

# Define the path to the react-forms-dev package
react_forms_dev_path = r"C:\Users\jordan.edelston\Documents\workshop\releases\react-forms-store\packages\react-forms-dev"

# Define the path to the yarn executable
yarn_path = r"C:\Users\jordan.edelston\Documents\workshop\releases\react-forms-store\.yarn\releases\yarn.cjs"

# Function to remove the react-forms-dev package
def purge_package(path):
    if os.path.exists(path):
        shutil.rmtree(path)
        print(f"Removed {path}")
    else:
        print(f"{path} does not exist")

# Function to recreate the react-forms-dev package using yarn create @storybook/react
def recreate_package(path):
    os.makedirs(path, exist_ok=True)
    subprocess.run(["node", yarn_path, "create", "@storybook/react"], cwd=path)
    print(f"Recreated {path} using yarn create @storybook/react")

# Purge the react-forms-dev package
purge_package(react_forms_dev_path)

# Recreate the react-forms-dev package
recreate_package(react_forms_dev_path)

print("Purge and recreation of react-forms-dev package completed successfully.")
