export interface User {
  id: number
  name: string
  email:  string
  gender: string
  status: string
}

export interface ListUserSetting {
  searchName?: string,
  searchId?: string,
  filterMale?: boolean,
  filterFemale?: boolean,
  filterActive?: boolean,
  filterInactive?: boolean,
}

export async function getUserDetail(user_id: number): Promise<User>{
  const res = await fetch(`https://gorest.co.in/public/v2/users/${user_id}`,{
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${process.env.NEXT_PUBLIC_GOREST_TOKEN}`
    }
  })
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
 
  return res.json()
}

function isAllUndefined(obj: any): boolean {
  return Object.values(obj).every(el => el === undefined)
}

function userListSettingToUrl(listUserSetting: ListUserSetting): string {
  let base = "https://gorest.co.in/public/v2/users?"
  if (isAllUndefined(listUserSetting)) {
    return base;
  }
  if (listUserSetting.filterMale && !listUserSetting.filterFemale) {
    base += "gender=male&"
  } else if (!listUserSetting.filterMale && listUserSetting.filterFemale) {
    base += "gender=female&"
  }
  
  if (listUserSetting.filterActive && !listUserSetting.filterInactive) {
    base += "status=active&"
  } else if (!listUserSetting.filterActive && listUserSetting.filterInactive) {
    base += "status=inactive&"
  }

  if (listUserSetting.searchName !== undefined && listUserSetting.searchName !== ""){
    base += `name=${listUserSetting.searchName}`
  }

  if (listUserSetting.searchId !== undefined && listUserSetting.searchId !== ""){
    base += `id=${listUserSetting.searchId}`
  }
  return base;
}

export async function getUserList(listUserSetting: ListUserSetting): Promise<User[]> {
  console.log(process.env.NEXT_PUBLIC_GOREST_TOKEN)
  const res = await fetch(userListSettingToUrl(listUserSetting),{
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${process.env.NEXT_PUBLIC_GOREST_TOKEN}`
    }
  })
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
  const c = await res.json()
  return c
}
