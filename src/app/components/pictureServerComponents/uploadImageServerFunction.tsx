"use server";

export async function uploadImage(formData) {
  const serverIP = 'http://127.0.0.1:5000'
  const uploadPath = serverIP + '/upload'
  try {
    const response = await fetch(uploadPath, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Failed to upload image.");
    }

    const data = await response.json(); // Get the file name from the server response
    return { success: true, data };
  } catch (error) {
    console.error(error);
    return { success: false, error: error.message };
  }
}
