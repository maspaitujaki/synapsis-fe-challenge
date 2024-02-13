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
      'Authorization': `Bearer ${process.env.NEXT_PUBLIC_GOREST_TOKEN}`,
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
    user: content
  }
}

export async function updateUser(user_id: number, prevState: any, formData: FormData){
  const rawFormData = {
    name: formData.get('name'),
    email: formData.get('email'),
    gender: formData.get('gender'),
    status: formData.get('status'),
  }
  const rawResponse = await fetch(`https://gorest.co.in/public/v2/users/${user_id}`,{
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${process.env.NEXT_PUBLIC_GOREST_TOKEN}`,
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
    user: content
  }
}

export async function deleteUser(user_id: string) {
  const rawResponse = await fetch(`https://gorest.co.in/public/v2/users/${user_id}`,{
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${process.env.NEXT_PUBLIC_GOREST_TOKEN}`,
      'Content-Type': 'application/json',
    },
  })
  if (!rawResponse.ok) {
    throw new Error('Failed to delete user')
  }
}