'use server'

export async function createUser(prevState: any, formData: FormData){
  const rawFormData = {
    name: formData.get('name'),
    email: formData.get('email'),
    gender: formData.get('gender'),
    status: formData.get('status'),
  }
  const rawResponse = await fetch("https://gorest.co.in/public/v2/users",{
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Authorization': 'Bearer c37216f918615142b0667c67dd95cc3d59b0cb39731c5623e2a7c3c6fb1ef18f',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(rawFormData)
  })
  if (!rawResponse.ok) {
    const content = await rawResponse.json();
    return { success: false, error: true, message: `${content[0].field} ${content[0].message}`}
  }
  const content = await rawResponse.json();
  return {
    success:true,
    newUser: content
  }
}