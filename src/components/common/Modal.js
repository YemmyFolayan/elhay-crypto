import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment } from 'react';
import './modal.scss';
export default function Modal({ isOpen, onClose, children, maxWidth = null }) {
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed-top"
          style={{ zIndex: 1000, overflowY: 'auto' }}
          onClose={() => {}}
        >
          <div
            style={{ height: '100vh' }}
            className="px-4 text-center d-flex justify-content-center my-modal"
          >
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay
                className="fixed-top"
                style={{
                  background: 'rgba(103, 169, 72, 0.2)',
                  backdropFilter: 'blur(4px)',
                  height: '100%',
                  zIndex: -1,
                }}
              />
            </Transition.Child>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div
                style={{
                  maxWidth: maxWidth ?? '600px',
                  position: 'relative',
                  transitionProperty: 'all',
                }}
                className="d-inline-block w-100 p-4 my-auto overflow-hidden text-left align-middle transition-all transform bg-white shadow rounded-lg fixed-top-modal"
              >
                {onClose && (
                  <span
                    style={{ top: 0, right: 0 }}
                    className="p-4 position-absolute"
                  >
                    <svg
                      style={{ cursor: 'pointer' }}
                      onClick={onClose}
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                    >
                      <path
                        d="M18.1429 1L9.57143 9.57143M9.57143 9.57143L1 18.1429M9.57143 9.57143L1 1M9.57143 9.57143L18.1429 18.1429"
                        stroke="#000000"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                )}
                {children}
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
