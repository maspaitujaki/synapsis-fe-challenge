"use client"
import Modal, { ModalBody, ModalContent, ModalFooter, ModalHead } from "@/components/Modal"
import { ListUserSetting, User, getUserList } from "@/models/User"
import { Dispatch, SetStateAction, useCallback, useEffect, useState } from "react"
import Image from "next/image";
import { createUser, deleteUser, updateUser } from "./action";
import { useFormState, useFormStatus } from "react-dom";

function UserTableRow({user, setUsers}: {user: User, setUsers: Dispatch<SetStateAction<User[]>>}) {
  const [open, setOpen] = useState(false);
  
  return (
    <tr className="bg-white border-b">
      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
        {user.id}
      </th>
      <td className="px-6 py-4">
        {user.name}
      </td>
      <td className="px-6 py-4">
        {user.email}
      </td>
      <td className="px-6 py-4">
        {user.gender}
      </td>
      <td className="px-6 py-4">
        {user.status}
      </td>
      <td className="px-6 py-4 text-right space-x-2">
        <button onClick={()=>setOpen(open=>!open)} className="font-medium text-yellow-600 hover:underline">Edit</button>
        <button 
          type="button" 
          className="font-medium text-red-600 hover:underline"
          onClick={async ()=>{
            try {
              await deleteUser(String(user.id))
              setUsers(users => {
                return users.filter((iUser) => iUser.id !== user.id)
              })
            } catch (error) {
              alert('Failed to delete user')
            }
          }} >Delete</button>
      </td>
      <EditUserModal open={open} setOpen={setOpen} user={user} setUsers={setUsers}/>
    </tr>
  )
}

function UserTable({users, setUsers}:{users: User[], setUsers: Dispatch<SetStateAction<User[]>>}) {
  return (
    <div className="w-full relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500">
              <thead className="text-xs text-white uppercase bg-zinc-800">
                  <tr>
                      <th scope="col" className="px-6 py-3">
                          Id
                      </th>
                      <th scope="col" className="px-6 py-3">
                          Name
                      </th>
                      <th scope="col" className="px-6 py-3">
                          Email
                      </th>
                      <th scope="col" className="px-6 py-3">
                          Gender
                      </th>
                      <th scope="col" className="px-6 py-3">
                          Status
                      </th>
                      <th scope="col" className="px-6 py-3">
                          Action
                      </th>
                  </tr>
              </thead>
              <tbody>
                {
                  users.map((user, idx) => (
                    <UserTableRow key={idx} user={user} setUsers={setUsers}/>
                  ))
                }
              </tbody>
          </table>
      </div>
  )
}
const initialState = {
  success: false,
  error: false,
  message: "",
  user: undefined,
}

function EditUserModal({open, setOpen, user, setUsers}: {open:boolean, setOpen: Dispatch<SetStateAction<boolean>>, user: User, setUsers: Dispatch<SetStateAction<User[]>>}) {
  const updateUserWithId = updateUser.bind(null, user.id)
  const [state, formAction] = useFormState(updateUserWithId, initialState)
  const { pending } = useFormStatus()
  useEffect(() => {
    if (state.user !== undefined) setUsers(users => {
      return [state.user, ...users.filter(iUser => iUser.id !== state.user.id)]
    });
  }, [setUsers, state.user])
  return (
    <Modal open={open && !state.success} setOpen={setOpen}>
      <ModalBody>
        <ModalHead>
          Edit @{user.id}&apos;s info
        </ModalHead>
        <ModalContent>
          <form id='create-user-form' className="grid grid-cols-3 gap-2" action={formAction}>
            <div className="flex items-center">
              <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-700">Name</label>
            </div>
            <input type="text" name="name" id="name" defaultValue={user.name} className="col-span-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="John Doe" required/>
            <div className="flex items-center">
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700">Email</label>
            </div>
            <input type="email" name="email" id="email" defaultValue={user.email} className="col-span-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="name@example.com" required/>
            <div className="flex items-center">
              <label htmlFor="gender" className=" block mb-2 text-sm font-medium text-gray-700">Gender</label>
            </div>
            <select defaultValue={user.gender} name="gender" className="col-span-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" id="gender">
              <option>Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            <div className="flex items-center">
              <label htmlFor="status" className="block mb-2 text-sm font-medium text-gray-700">Status</label>
            </div>
            <select defaultValue={user.status} name="status" className="col-span-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" id="status">
              <option>Select status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </form>
          <p className="text-red-400">
            {state && state.error && state.message}
          </p>
        </ModalContent>
      </ModalBody>
      <ModalFooter>
        <div className="flex justify-between">
          <button
            type="button"
            className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
            onClick={() => setOpen(false)}
          >
            Cancel
          </button>
          <button
            disabled={pending}
            form="create-user-form"
            type="submit"
            className="inline-flex w-full justify-center rounded-md bg-zinc-700 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-zinc-600 sm:ml-3 sm:w-auto"
          >
            {
              pending? "Submitting..." : "Submit"
            }
          </button>
        </div>
      </ModalFooter>
    </Modal>
  )
}

function CreateUserModal({open, setOpen, setUsers}: {open:boolean, setOpen: Dispatch<SetStateAction<boolean>>, setUsers: Dispatch<SetStateAction<User[]>>}) {
  const [state, formAction] = useFormState(createUser, initialState)
  const { pending } = useFormStatus()
  useEffect(() => {
    if (state.user !== undefined) setUsers(users => [state.user,...users]);
  }, [setUsers, state.user])
  return (
    <Modal open={open && !state.success} setOpen={setOpen}>
      <ModalBody>
        <ModalHead>
          Create New User
        </ModalHead>
        <ModalContent>
          <form id='create-user-form' className="grid grid-cols-3 gap-2" action={formAction}>
            <div className="flex items-center">
              <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-700">Name</label>
            </div>
            <input type="text" name="name" id="name" className="col-span-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="John Doe" required/>
            <div className="flex items-center">
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700">Email</label>
            </div>
            <input type="email" name="email" id="email" className="col-span-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="name@example.com" required/>
            <div className="flex items-center">
              <label htmlFor="gender" className=" block mb-2 text-sm font-medium text-gray-700">Gender</label>
            </div>
            <select defaultValue={0} name="gender" className="col-span-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" id="gender">
              <option>Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            <div className="flex items-center">
              <label htmlFor="status" className="block mb-2 text-sm font-medium text-gray-700">Status</label>
            </div>
            <select defaultValue={0} name="status" className="col-span-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" id="status">
              <option>Select status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </form>
          <p className="text-red-400">
            {state && state.error && state.message}
          </p>
        </ModalContent>
      </ModalBody>
      <ModalFooter>
        <div className="flex justify-between">
          <button
            type="button"
            className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
            onClick={() => setOpen(false)}
          >
            Cancel
          </button>
          <button
            disabled={pending}
            form="create-user-form"
            type="submit"
            className="inline-flex w-full justify-center rounded-md bg-zinc-700 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-zinc-600 sm:ml-3 sm:w-auto"
          >
            {
              pending? "Submitting..." : "Submit"
            }
          </button>
        </div>
      </ModalFooter>
    </Modal>
  )
}

export default function UsersPage() {
  const [open, setOpen] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [listUserSetting, setListUserSetting] = useState<ListUserSetting>({
    searchId: "",
    searchName: "",
    filterActive: false,
    filterInactive: false,
    filterMale: false,
    filterFemale: false,
  })

  const onChangeSearchFilter = useCallback((e: React.ChangeEvent<HTMLInputElement>)=> {
    switch (e.target.name) {
      case "filterMale":
        setListUserSetting((listUserSetting) => {
          return {
            ...listUserSetting,
            filterMale: !listUserSetting.filterMale
          }
        })
        break;
      case "filterFemale":
        setListUserSetting((listUserSetting) => {
          return {
            ...listUserSetting,
            filterFemale: !listUserSetting.filterFemale
          }
        })
        break;
      case "filterActive":
        setListUserSetting((listUserSetting) => {
          return {
            ...listUserSetting,
            filterActive: !listUserSetting.filterActive
          }
        })
        break;
      case "filterInactive":
        setListUserSetting((listUserSetting) => {
          return {
            ...listUserSetting,
            filterInactive: !listUserSetting.filterInactive
          }
        })
        break;
      case "searchName":
        setListUserSetting((listUserSetting) => {
          return {
            ...listUserSetting,
            searchName: e.target.value
          }
        })
        break;
      case "searchId":
        setListUserSetting((listUserSetting) => {
          return {
            ...listUserSetting,
            searchId: e.target.value
          }
        })
        break;
    
      default:
        break;
    }
  },[])

  useEffect(()=>{
    const getUsers= async () => {
      const resUsers = await getUserList(listUserSetting);
      setUsers(resUsers)
    }
    getUsers()
  },[listUserSetting])

  return (
    <>
      <div className="flex justify-between">
        <h1 className="font-serif font-semibold text-4xl">Users</h1>
        <button className="shadow flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded hover:bg-gray-100 hover:text-gray-700" onClick={()=>setOpen(true)}>
          <Image 
            src="/plus.svg"
            alt="Add new user"
            className=""
            width={24}
            height={24}
            priority
          />          
        </button>
      </div>
      <div className="grid grid-cols-4 gap-2">
        <aside className="w-2xl">
          <div className="border rounded py-4 pl-4 pr-8 space-y-4">
            <div>
              <h2 className="font-semibold">Search</h2>
              <div className="">
                  <label className="text-sm font-medium text-gray-600">ID</label>
                  <input name="searchId" type="text" onChange={onChangeSearchFilter} value={listUserSetting.searchId} className="border-2 border-zinc-800 rounded" placeholder="Type user ID here..."/>
              </div>
              <div className="">
                  <label className="text-sm font-medium text-gray-600">Name</label>
                  <input name="searchName" type="text" onChange={onChangeSearchFilter} value={listUserSetting.searchName} className="border-2 border-zinc-800 rounded" placeholder="Type user name here..."/>
              </div>
            </div>
            <div>
              <h2 className="font-semibold">Filter</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-sm">Gender</h3>
                  <div className="flex items-center">
                      <input name="filterMale" type="checkbox" onChange={onChangeSearchFilter} checked={listUserSetting.filterMale} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"/>
                      <label className="ms-2 text-sm font-medium text-gray-600">Male</label>
                  </div>
                  <div className="flex items-center">
                      <input name="filterFemale" type="checkbox" onChange={onChangeSearchFilter} checked={listUserSetting.filterFemale} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"/>
                      <label className="ms-2 text-sm font-medium text-gray-600">Female</label>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-sm">Status</h3>
                  <div className="flex items-center">
                      <input name="filterActive" type="checkbox" onChange={onChangeSearchFilter} checked={listUserSetting.filterActive} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"/>
                      <label className="ms-2 text-sm font-medium text-gray-600">Active</label>
                  </div>
                  <div className="flex items-center">
                      <input name="filterInactive" type="checkbox" onChange={onChangeSearchFilter} checked={listUserSetting.filterInactive} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"/>
                      <label className="ms-2 text-sm font-medium text-gray-600">Inactive</label>
                  </div>
                </div>
              </div>
            </div>
            </div>
        </aside>
        <main className="col-span-3">
          <UserTable users={users} setUsers={setUsers}/>
        </main>
      </div>
      <CreateUserModal open={open} setOpen={setOpen} setUsers={setUsers}/>
    </>
  )
}