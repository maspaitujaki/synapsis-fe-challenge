import { Dispatch, Fragment, SetStateAction, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'

export interface ModalProps {
  children: React.ReactNode
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export function ModalBody({children}: {children: React.ReactNode}) {
  return (
    <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
      <div className="sm:flex sm:items-start">
        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
          {children}
        </div>
      </div>
    </div>
  )
}
export function ModalHead({children}: {children:React.ReactNode}) {
  return (
    <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
      {children}
    </Dialog.Title>
  )
}
export function ModalContent({children}: {children:React.ReactNode}) {
  return (
    <div className="mt-2">
      <div className="text-sm text-gray-500">
        {children}
      </div>
    </div>
  )
}

export function ModalFooter({children}: {children:React.ReactNode}) {
  return (
    <div className="bg-gray-50 px-4 py-3">
      {children}
    </div>
  )
}

export default function Modal({children ,open, setOpen}: ModalProps) {

  const cancelButtonRef = useRef(null)

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                {children}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
