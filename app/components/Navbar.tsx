import React, {useEffect, useState} from 'react';
import {Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems} from '@headlessui/react'
import {Bars3Icon, BellIcon, XMarkIcon} from '@heroicons/react/24/outline'
import {NavLink} from "react-router";

function Navbar(props) {

    const navigation = [
        {name: 'Forms', href: '/', current: true},
        {name: 'List', href: '/list', current: false},
    ]

    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }

    return (
        <>
            <div className="min-h-full">
                <Disclosure as="nav" className="bg-gray-800">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="flex h-16 items-center justify-between">
                            <div className="flex items-center">
                                <div className="shrink-0">
                                    <img
                                        alt="Your Company"
                                        src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
                                        className="size-8"
                                    />
                                </div>
                                <div className="hidden md:block">
                                    <div className="ml-10 flex items-baseline space-x-4">
                                        {navigation.map((item) => (
                                            <NavLink
                                                activeClassName='bg-gray-900'
                                                key={item.name}
                                                to={item.href}
                                                aria-current={item.current ? 'page' : undefined}
                                                className={({ isActive }) =>
                                                     isActive ? "rounded-md px-3 py-2 bg-gray-700 text-white" : "rounded-md px-3 py-2 text-sm text-white font-medium"
                                                }
                                            >
                                                {item.name}
                                            </NavLink>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="-mr-2 flex md:hidden">
                                {/* Mobile menu button */}
                                <DisclosureButton
                                    className="group relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden">
                                    <span className="absolute -inset-0.5"/>
                                    <span className="sr-only">Open main menu</span>
                                    <Bars3Icon aria-hidden="true" className="block size-6 group-data-open:hidden"/>
                                    <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-open:block"/>
                                </DisclosureButton>
                            </div>
                        </div>
                    </div>

                    <DisclosurePanel className="md:hidden">
                        <div className="space-y-1 px-2 pt-2 pb-3 sm:px-3">
                            {navigation.map((item) => (
                                <NavLink
                                    activeClassName='bg-gray-900'
                                    key={item.name}
                                    to={item.href}
                                    aria-current={item.current ? 'page' : undefined}
                                    className={({ isActive }) =>
                                        isActive ? "rounded-md px-3 py-2 bg-gray-700 text-white" : "rounded-md px-3 py-2 text-sm text-white font-medium"
                                    }
                                >
                                    {item.name}
                                </NavLink>
                            ))}
                        </div>

                    </DisclosurePanel>
                </Disclosure>
                <header className="bg-white shadow-sm">
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Smart Insurance Application</h1>
                    </div>
                </header>
            </div>
        </>
    );
}

export default Navbar;