import React, {Fragment, useEffect, useState} from 'react';
import Services from "~/api/services";
import {
    Tab,
    TabGroup,
    TabList,
    TabPanel,
    TabPanels,
} from '@headlessui/react'
import {ChevronDownIcon} from "@heroicons/react/16/solid";
import {option} from "framer-motion/m";

function Main(props) {
    const services = new Services();

    const [health, setHealth] = useState([])
    const [home, setHome] = useState([])
    const [car, setCar] = useState([])
    const [smoker, setSmoker] = useState(false)
    const [country, setCountry] = useState('USA')
    const [statesOptions, setStatesOptions] = useState([])
    const [homeSecurity, setHomeSecurity] = useState(false)
    const [carAccident, setCarAccident] = useState(false)

    const navigation = {
        tabs: [
            {
                id: 'health',
                name: 'Health'
            },
            {
                id: 'home',
                name: 'Home',
            },
            {
                id: 'car',
                name: 'Car',
            },
        ]
    }

    useEffect(() => {
        const res = services.fetchAllForms();
        res.then(result => {
            setHealth(result[0])
            setHome(result[1])
            setCar(result[2])
        })
    }, [])

    useEffect(() => {
        const res = services.fetchStatesOfCountries(country);
        res.then(result => {
            setStatesOptions(result.states)
        })
    }, [country]);

    const renderPersonalInfoForm = () => {
        return (
            <>
                {health.fields?.[0].fields.map((item, index) => (
                    <div key={index} className="mt-5">
                        <label htmlFor={`field-${index}`}
                               className="block text-sm/6 font-semibold text-gray-900">
                            {item.label}
                        </label>
                        <div className="mt-2.5">
                            <input
                                required={item.required}
                                id={`field-${index}`}
                                name={item.id}
                                type={item.type}
                                className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                            />
                        </div>
                    </div>
                ))}
            </>
        );
    };
    const renderAddressForm = () => {
        return (
            <>
                {health.fields?.[1].fields.map((item, index) => (
                    <div key={index} className="mt-5">
                        <label htmlFor={`field-${index}`}
                               className="block text-sm/6 font-semibold text-gray-900">
                            {item.label}
                        </label>
                        <div className="mt-2.5  grid grid-cols-1">
                            {
                                item.type !== 'text' ?
                                    <>
                                        <select
                                            onChange={(e) => setCountry(e.target.value)}
                                            id={item.id}
                                            name={item.id}
                                            autoComplete={`${item.id}-name`}
                                            className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                        >
                                            {
                                                item.id === 'state' ?
                                                    statesOptions?.map((item, index) => (
                                                        <option key={index}>{item}</option>
                                                    ))
                                                    :
                                                    item.options?.map((item, index) => (
                                                        <option key={index}>{item}</option>
                                                    ))
                                            }

                                        </select>
                                        <ChevronDownIcon
                                            aria-hidden="true"
                                            className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                                        />
                                    </>
                                    :
                                    <>
                                        <input
                                            required={item.required}
                                            id={`field-${index}`}
                                            name={item.id}
                                            type={item.type}
                                            className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                                        />
                                    </>

                            }

                        </div>
                    </div>
                ))}
            </>
        );
    };
    const renderHealthForm = () => {
        return (
            <>
                {health.fields?.[2].fields.map((item, index) => (
                    <div key={index} className="mt-5">
                        {
                            item.type !== 'radio' ?

                                <label htmlFor={`field-${index}`}
                                       className="block text-sm/6 font-semibold text-gray-900">
                                    {smoker && item.label}
                                </label>
                                :
                                <label htmlFor={`field-${index}`}
                                       className="block text-sm/6 font-semibold text-gray-900">
                                    {item.label}
                                </label>
                        }

                        <div className="mt-2.5  grid grid-cols-none">
                            {
                                item.type !== 'radio' ?
                                    smoker ?
                                        <>
                                            <select
                                                id="country"
                                                name="country"
                                                autoComplete="country-name"
                                                className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                            >
                                                {
                                                    item.options?.map((list, index) => (
                                                        <option key={index}>{list}</option>
                                                    ))
                                                }
                                            </select>
                                            <ChevronDownIcon
                                                aria-hidden="true"
                                                className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                                            />
                                        </>
                                        :
                                        <div></div>

                                    :
                                    <>
                                        <div className="mt-6 flex">
                                            {item.options?.map((option, index) => (
                                                <div className="flex items-center gap-x-3 mx-1">
                                                    <input
                                                        defaultChecked={option === 'No'}
                                                        id={`radio-${index}`}
                                                        name={item.id}
                                                        type={item.type}
                                                        onChange={() => setSmoker(!smoker)}
                                                        className="cursor-pointer relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white not-checked:before:hidden checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden"
                                                    />
                                                    <label htmlFor={`radio-${index}`}
                                                           className="block text-sm/6 font-semibold text-gray-900">
                                                        {option}
                                                    </label>
                                                </div>
                                            ))}
                                        </div>

                                    </>
                            }
                        </div>
                    </div>
                ))}
            </>
        );
    };
    const renderHomeOwnerForm = () => {
        return (
            <>
                <div className="mt-5">
                    <div className="mt-2.5  grid grid-cols-none">
                        <>
                            <div className="flex mt-6">
                                {home.fields?.[0].options?.map((option, index) => (
                                    <div className="flex items-center gap-x-3 mx-1">
                                        <input
                                            defaultChecked={index === 0}
                                            id={`radio-${index}`}
                                            name={home.fields?.[0].id}
                                            type={home.fields?.[0].type}
                                            className="cursor-pointer relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white not-checked:before:hidden checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden"
                                        />
                                        <label htmlFor={`radio-${index}`}
                                               className="block text-sm/6 font-semibold text-gray-900">
                                            {option}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </>
                    </div>
                </div>
            </>
        );
    };
    const renderHomePropertyForm = () => {
        return (
            <>
                <div className="mt-5">
                    <div className="mt-2.5  grid grid-cols-none">
                        <select
                            id={home.fields?.[1].id}
                            name={home.fields?.[1].id}
                            autoComplete={`${home.fields?.[1].id}-name`}
                            className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        >
                            {
                                home.fields?.[1].options?.map((item, index) => (
                                    <option key={index}>{item}</option>
                                ))
                            }

                        </select>
                        <ChevronDownIcon
                            aria-hidden="true"
                            className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                        />
                    </div>
                </div>
            </>
        );
    };
    const renderEstimatedHomeValueForm = () => {
        return (
            <>
                <div className="mt-5">
                    <div className="mt-2.5  grid grid-cols-none">
                        <input type={home.fields?.[2].type}
                               id={home.fields?.[2].id}
                               min={home.fields?.[2].validation.min}
                               max={home.fields?.[2].validation.max}
                               aria-describedby="helper-text-explanation"
                               className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                               placeholder={home.fields?.[2].validation.min}/>

                    </div>
                </div>
            </>
        );
    }
    const renderHomeSecurity = () => {
        return (
            <>
                <div className="mt-5">
                    <div className="mt-2.5  grid grid-cols-none">
                        <>
                            <div className="flex mt-6">
                                {home.fields?.[3].options?.map((option, index) => (
                                    <div className="flex items-center gap-x-3 mx-1">
                                        <input
                                            defaultChecked={option === 'No'}
                                            id={`radio-${index}`}
                                            name={home.fields?.[3].id}
                                            type={home.fields?.[3].type}
                                            onChange={() => setHomeSecurity(!homeSecurity)}
                                            className="cursor-pointer relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white not-checked:before:hidden checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden"
                                        />
                                        <label htmlFor={`radio-${index}`}
                                               className="block text-sm/6 font-semibold text-gray-900">
                                            {option}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </>
                    </div>
                </div>
            </>
        );
    };
    const renderHomeSecurityType = () => {
        return (
            <>
                <div className="mt-5">
                    <div className="mt-2.5  grid grid-cols-none">
                        <select
                            onChange={(e) => console.log(e.target.value)}
                            id={home.fields?.[4].id}
                            name={home.fields?.[4].id}
                            autoComplete={`${home.fields?.[4].id}-name`}
                            className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        >
                            {
                                home.fields?.[4].options?.map((item, index) => (
                                    <option key={index}>{item}</option>
                                ))
                            }

                        </select>
                        <ChevronDownIcon
                            aria-hidden="true"
                            className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                        />
                    </div>
                </div>
            </>
        );
    };
    const renderHomeFireSafety = () => {
        return (
            <>
                <div className="mt-5">
                    <div className="mt-2.5  grid grid-cols-none">
                        <>
                            <div className="flex mt-6">
                                {home.fields?.[5].options?.map((option, index) => (
                                    <div className="flex items-center gap-x-3 mx-1">
                                        <input
                                            defaultChecked={index === 0}
                                            id={`radio-${index}`}
                                            name={home.fields?.[5].id}
                                            type={home.fields?.[5].type}
                                            className="col-start-1 row-start-1 cursor-pointer rounded-sm border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                                        />
                                        <label htmlFor={`radio-${index}`}
                                               className="block text-xs/4 font-semibold text-gray-900">
                                            {option}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </>
                    </div>
                </div>
            </>
        );
    };
    const renderHomeAddressForm = () => {
        return (
            <>
                {home.fields?.[6].fields.map((item, index) => (
                    <div key={index} className="mt-5">
                        <label htmlFor={`field-${index}`}
                               className="block text-sm/6 font-semibold text-gray-900">
                            {item.label}
                        </label>
                        <div className="mt-2.5  grid grid-cols-1">
                            {
                                item.type !== 'text' ?
                                    <>
                                        <select
                                            onChange={(e) => setCountry(e.target.value)}
                                            id={item.id}
                                            name={item.id}
                                            autoComplete={`${item.id}-name`}
                                            className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                        >
                                            {
                                                item.id === 'state' ?
                                                    statesOptions?.map((item, index) => (
                                                        <option key={index}>{item}</option>
                                                    ))
                                                    :
                                                    item.options?.map((item, index) => (
                                                        <option key={index}>{item}</option>
                                                    ))
                                            }

                                        </select>
                                        <ChevronDownIcon
                                            aria-hidden="true"
                                            className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                                        />
                                    </>
                                    :
                                    <>
                                        <input
                                            required={item.required}
                                            id={`field-${index}`}
                                            name={item.id}
                                            type={item.type}
                                            className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                                        />
                                    </>

                            }

                        </div>
                    </div>
                ))}
            </>
        );
    };
    const renderHomeCoverageTypeForm = () => {
        return (
            <>
                <div className="mt-5">
                    <div className="mt-2.5  grid grid-cols-none">
                        <select
                            onChange={(e) => console.log(e.target.value)}
                            id={home.fields?.[7].id}
                            name={home.fields?.[7].id}
                            autoComplete={`${home.fields?.[7].id}-name`}
                            className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        >
                            {
                                home.fields?.[7].options?.map((item, index) => (
                                    <option key={index}>{item}</option>
                                ))
                            }

                        </select>
                        <ChevronDownIcon
                            aria-hidden="true"
                            className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                        />
                    </div>
                </div>
            </>
        );
    };
    const renderCarOwnershipForm = () => {
        return (
            <>
                <div className="mt-5">
                    <div className="mt-2.5  grid grid-cols-none">
                        <>
                            <div className="flex mt-6">
                                {car.fields?.[0].options?.map((option, index) => (
                                    <div className="flex items-center gap-x-3 mx-1">
                                        <input
                                            defaultChecked={index === 0}
                                            id={`radio-${index}`}
                                            name={car.fields?.[0].id}
                                            type={car.fields?.[0].type}
                                            className="cursor-pointer relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white not-checked:before:hidden checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden"
                                        />
                                        <label htmlFor={`radio-${index}`}
                                               className="block text-sm/6 font-semibold text-gray-900">
                                            {option}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </>
                    </div>
                </div>
            </>
        );
    };
    const renderCarInfoForm = () => {
        return (
            <>

                {car.fields?.[1].fields.map((item, index) => (
                    item.type === 'text' ?
                        <div key={index} className="mt-5">
                            <label htmlFor={`field-${index}`}
                                   className="block text-sm/6 font-semibold text-gray-900">
                                {item.label}
                            </label>
                            <div className="mt-2.5">
                                <input
                                    required={item.required}
                                    id={`field-${index}`}
                                    name={item.id}
                                    type={item.type}
                                    className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                                />
                            </div>
                        </div>
                        :
                        item.type === 'number' ?
                            <div key={index} className="mt-13">
                                <input type={item.type}
                                       id={item.id}
                                       min={item.validation.min}
                                       max={item.validation.max}
                                       name={item.id}
                                       aria-describedby="helper-text-explanation"
                                       className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                                       placeholder={item.validation.min}/>
                            </div>
                            :
                            <div key={index} className="mt-5">
                                <label htmlFor={`field-${index}`}
                                       className="block text-sm/6 font-semibold text-gray-900">
                                    {item.label}
                                </label>
                                <div className="mt-2.5  grid grid-cols-none">
                                    <select
                                        // onChange={(e) => setCountry(e.target.value)}
                                        id={car.fields?.[1].id}
                                        name={car.fields?.[1].id}
                                        className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                    >
                                        {
                                            item.options?.map((option, index) => (
                                                <option key={index}>{option}</option>
                                            ))
                                        }

                                    </select>
                                    <ChevronDownIcon
                                        aria-hidden="true"
                                        className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                                    />
                                </div>
                            </div>

                ))}
            </>
        );
    };
    const renderDrivingRecord = () => {
        return (
            <>
                {car.fields?.[2].fields.map((item, index) => (
                    <div key={index} className="mt-5">
                        {
                            item.type !== 'radio' ?

                                <label htmlFor={`field-${index}`}
                                       className="block text-sm/6 font-semibold text-gray-900">
                                    {carAccident && item.label}
                                </label>
                                :
                                <label htmlFor={`field-${index}`}
                                       className="block text-sm/6 font-semibold text-gray-900">
                                    {item.label}
                                </label>
                        }

                        <div className="mt-2.5  grid grid-cols-none">
                            {
                                item.type !== 'radio' ?
                                    carAccident ?
                                        <>
                                            <div key={index} className="mt-1">
                                                <input type={item.type}
                                                       id={item.id}
                                                       name={item.id}
                                                       min={0}
                                                       aria-describedby="helper-text-explanation"
                                                       className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                                                       placeholder={'0'}/>
                                            </div>
                                        </>
                                        :
                                        <div></div>

                                    :
                                    <>
                                        <div className="mt-6 flex">
                                            {item.options?.map((option, index) => (
                                                <div className="flex items-center gap-x-3 mx-1">
                                                    <input
                                                        defaultChecked={option === 'No'}
                                                        id={`radio-${index}`}
                                                        name={item.id}
                                                        type={item.type}
                                                        onChange={() => item.id === 'license_suspensions' ? '' : setCarAccident(!carAccident)}
                                                        className="cursor-pointer relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white not-checked:before:hidden checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden"
                                                    />
                                                    <label htmlFor={`radio-${index}`}
                                                           className="block text-sm/6 font-semibold text-gray-900">
                                                        {option}
                                                    </label>
                                                </div>
                                            ))}
                                        </div>

                                    </>
                            }
                        </div>
                    </div>
                ))}
            </>
        )
    }
    return (

        <div className="min-h-full">
            <main>
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <TabGroup className="mt-2">
                        <div className="border-b border-gray-200">
                            <TabList className="-mb-px flex space-x-8 px-4">
                                {navigation.tabs.map((category) => (
                                    <Tab
                                        key={category.name}
                                        className="cursor-pointer flex-1 border-b-2 border-transparent px-1 py-4 text-base font-medium whitespace-nowrap text-gray-900 data-selected:border-indigo-600 data-selected:text-indigo-600"
                                    >
                                        {category.name}
                                    </Tab>
                                ))}
                            </TabList>
                        </div>
                        <TabPanels as={Fragment}>
                            {/*Health Insurance  Section*/}
                            <TabPanel key={'Health'} className="space-y-10 px-4 pt-10 pb-8">
                                <div className="gap-x-4">
                                    <h1>{health.title}</h1>
                                    <hr className={"text-gray-100"}/>
                                    <h6 className="mt-5">{health.fields?.[0].label}</h6>
                                    <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-3">
                                        {
                                            renderPersonalInfoForm()
                                        }
                                    </div>
                                    <hr className={"text-gray-100 my-5"}/>
                                    <h6 className="mt-5">{health.fields?.[1].label}</h6>
                                    <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-3">
                                        {
                                            renderAddressForm()
                                        }
                                    </div>
                                    <hr className={"text-gray-100 my-5"}/>
                                    <h6 className="mt-5">{health.fields?.[2].label}</h6>
                                    <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-3">
                                        {
                                            renderHealthForm()
                                        }
                                    </div>
                                    <div className="mt-10">
                                        <button
                                            type="submit"
                                            className="block rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                        >
                                            Save Data
                                        </button>
                                    </div>
                                </div>
                            </TabPanel>
                            {/*Home Insurance  Section*/}
                            <TabPanel key={'Home'} className="space-y-10 px-4 pt-10 pb-8">
                                <div className="gap-x-4">
                                    <h1>{home.title}</h1>
                                    <hr className={"text-gray-100"}/>
                                    <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-4">
                                        <div>
                                            <h6 className="mt-5">{home.fields?.[0].label}</h6>
                                            {
                                                renderHomeOwnerForm()
                                            }
                                        </div>
                                        <div>
                                            <h6 className="mt-5">{home.fields?.[1].label}</h6>
                                            {
                                                renderHomePropertyForm()
                                            }
                                        </div>
                                        <div>
                                            <h6 className="mt-5">{home.fields?.[7].label}</h6>
                                            {
                                                renderHomeCoverageTypeForm()
                                            }
                                        </div>
                                        <div>
                                            <h6 className="mt-5">{home.fields?.[5].label}</h6>
                                            {
                                                renderHomeFireSafety()
                                            }
                                        </div>

                                    </div>
                                    <hr className={"my-5 text-gray-100"}/>
                                    <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-3">
                                        <div>
                                            <div>
                                                <h6 className="mt-5">{home.fields?.[2].label}</h6>
                                                {
                                                    renderEstimatedHomeValueForm()
                                                }
                                            </div>

                                        </div>
                                        <div>
                                            <h6 className="mt-5">{home.fields?.[3].label}</h6>
                                            {
                                                renderHomeSecurity()
                                            }
                                        </div>

                                        <div>
                                            {
                                                homeSecurity ?
                                                    <>
                                                        <h6 className="mt-5">{home.fields?.[4].label}</h6>
                                                        {renderHomeSecurityType()}
                                                    </>
                                                    :
                                                    null
                                            }
                                        </div>


                                    </div>
                                    <hr className={"my-5 text-gray-100"}/>
                                    <h6 className="mt-5">{home.fields?.[6].label}</h6>
                                    <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-4">
                                        {
                                            renderHomeAddressForm()
                                        }
                                    </div>
                                    <div className="mt-5">
                                        <button
                                            type="submit"
                                            className="block rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                        >
                                            Save Data
                                        </button>
                                    </div>
                                </div>
                            </TabPanel>
                            {/*Car Insurance  Section*/}
                            <TabPanel key={'Car'} className="space-y-10 px-4 pt-10 pb-8">
                                <div className="gap-x-4">
                                    <h1>{car.title}</h1>
                                    <hr className={"text-gray-100"}/>
                                    <h6 className="mt-5">{car.fields?.[0].label}</h6>
                                    <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-1">
                                        {
                                            renderCarOwnershipForm()
                                        }
                                    </div>
                                    <hr className={"text-gray-100 my-5"}/>
                                    <h6 className="mt-5">{car.fields?.[1].label}</h6>
                                    <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-4">
                                        {
                                            renderCarInfoForm()
                                        }
                                    </div>
                                    <hr className={"text-gray-100 my-5"}/>
                                    <h6 className="mt-5">{car.fields?.[2].label}</h6>
                                    <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-3">
                                        {
                                            renderDrivingRecord()
                                        }
                                    </div>

                                    <div className="mt-10">
                                        <button
                                            type="submit"
                                            className="block rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                        >
                                            Save Data
                                        </button>
                                    </div>
                                </div>
                            </TabPanel>
                        </TabPanels>
                    </TabGroup>

                </div>
            </main>
        </div>

    );
}

export default Main;