import Link from 'next/link'
import { useRouter } from 'next/router'
import { AuthContext } from '../context/useAuth'
import SearchBox from '../components/searchBox'
import firebase from '../auth/initFirebase'
import { useState, useContext } from 'react'
import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import {
  MenuIcon,
  XIcon,
  SearchIcon,
  UserCircleIcon,
} from '@heroicons/react/outline'
import CartIcon from './cartIcon'

const navigation = [
  { name: 'About ', href: '/about', current: false },
  { name: 'FAQ', href: '/faq', current: false },
  { name: 'Contact', href: '/contact', current: false },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

function Header({ placeholder }) {
  const {
    state: { authenticated, user },
    dispatch,
  } = useContext(AuthContext)

  const router = useRouter()

  const [location, setLocation] = useState('')
  const [searchInput, setSearchInput] = useState('')
  const [clickedOnProfile, setClickedOnProfile] = useState(false)
  const [values, setValues] = useState({
    address: '',
    latitude: 0,
    longitude: 0,
  })

  const handleLogoutClick = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        router.push('/')
      })
      .catch((e) => {
        console.log(e)
      })
    dispatch({ type: 'LOGOUT' })
  }

  const handleSearch = () => {
    router.push(
      `/search?item=${searchInput}&longitude=${values.longitude}&latitude=${values.latitude}&address=${values.address}`
    )
  }

  return (
    <header className='sticky z-50 top-0 '>
      <Disclosure as='nav' className={'bg-white'}>
        {({ open }) => (
          <>
            <div className='max-w-7xl mx-auto px-2 sm:px-6 lg:px-8'>
              <div className='relative flex items-center space-between h-16'>
                <div className='absolute inset-y-0 left-0 flex items-center sm:hidden'>
                  {/* DESKTOP MENU */}
                  <Disclosure.Button className='inline-flex items-center justify-center p-2 rounded-md text-gray-800 hover:text-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'>
                    <span className='sr-only'>Open main menu</span>
                    {open ? (
                      <XIcon className='block h-6 w-6' aria-hidden='true' />
                    ) : (
                      <MenuIcon className='block h-6 w-6' aria-hidden='true' />
                    )}
                  </Disclosure.Button>
                </div>
                <div className='flex-1 flex items-center justify-center sm:items-stretch sm:justify-start'>
                  <div className='flex-shrink-0 flex items-center'>
                    <img
                      onClick={() => router.push('/')}
                      className='block lg:hidden h-10 w-auto'
                      src='https://res.cloudinary.com/delhozzsh/image/upload/v1666683894/yellow_star-2_rqmkfo.png'
                      alt='Makeshipjoy'
                    />
                    <img
                      onClick={() => router.push('/')}
                      className='hidden lg:block h-10 w-auto'
                      src='https://res.cloudinary.com/delhozzsh/image/upload/v1666683894/yellow_star-2_rqmkfo.png'
                      alt='Makeshipjoy'
                    />
                  </div>

                  {/*  DESKTOP MENU  */}
                  <div className='hidden sm:inline-block '>
                    <div className='flex w-full'>
                      {navigation.map((item) => (
                        <Link key={item.name} href={item.href}>
                          <a
                            key={item.name}
                            className={classNames(
                              item.current
                                ? 'bg-gray-900 text-white'
                                : 'text-black hover:bg-gray-700 hover:text-white',
                              'px-3 py-3 rounded-md text-sm font-medium'
                            )}
                            aria-current={item.current ? 'page' : undefined}
                          >
                            {item.name}
                          </a>
                        </Link>
                      ))}

                      <div className='flex rounded-full flex-grow md:shadow-sm  '>
                        <input
                          value={searchInput}
                          onChange={(e) => setSearchInput(e.target.value)}
                          onKeyDown={(e) => e.key === 'Enter' && search()}
                          placeholder={placeholder || 'Search'}
                          className='w-1/2  text-xs md:text-sm text-black pl-5 placeholder-gray-400 outline-none bg-transparent'
                        />
                        <span className='p-1 mt-1'>|</span>
                        {/* <input
                              className="flex-grow text-sm text-black pl-5 placeholder-gray-400 outline-none bg-transparent"
                              type="text"
                              placeholder="Location"
                              value={location}
                              onChange={(e) => setLocation(e.target.value)}
                            /> */}

                        <SearchBox
                          className='z-50 flex-grow text-xs md:text-sm text-black pl-5 placeholder-gray-400 outline-none bg-transparent'
                          onSelectAddress={(address, latitude, longitude) => {
                            setValues({
                              latitude: latitude,
                              address: address,
                              longitude: longitude,
                            })
                          }}
                          defaultValue=''
                          searchBoxText='Singapore'
                        />
                        {/* flex-grow so can grow  */}
                        {/* hidden search icon, show only in medium screen */}
                        <SearchIcon
                          onClick={handleSearch}
                          className='sm:h-7 sm:mt-2 sm:p-2  md:inline-flex  mx-auto cursor-pointer md:mx-2  rounded-full text-black'
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className='absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0'>
                  <div className='w-8 h-8 bg-gray-800 rounded-full'>
                    <CartIcon />
                  </div>

                  {/* Profile dropdown */}
                  <Menu as='div' className='ml-3 relative'>
                    <div>
                      <Menu.Button className='bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white'>
                        <span className='sr-only'>Open user menu</span>
                        <UserCircleIcon className='h-8 w-8 rounded-full text-white' />
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter='transition ease-out duration-100'
                      enterFrom='transform opacity-0 scale-95'
                      enterTo='transform opacity-100 scale-100'
                      leave='transition ease-in duration-75'
                      leaveFrom='transform opacity-100 scale-100'
                      leaveTo='transform opacity-0 scale-95'
                    >
                      <Menu.Items className='origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none'>
                        <Menu.Item>
                          {user ? (
                            <span className="'block px-4 py-2 text-sm font-bold text-gray-700 '">
                              {user.displayName}
                            </span>
                          ) : (
                            <span className="'block px-4 py-2  font-bold text-sm text-gray-700 '">
                              Not Logged In
                            </span>
                          )}
                        </Menu.Item>

                        <Menu.Item>
                          {({ active }) =>
                            authenticated ? (
                              <Link href='/dashboard#overview'>
                                <a
                                  className={classNames(
                                    active ? 'bg-gray-100' : '',
                                    'block px-4 py-2 text-sm text-gray-700 '
                                  )}
                                >
                                  Dashboard
                                </a>
                              </Link>
                            ) : (
                              <Link href='/login'>
                                <a
                                  className={classNames(
                                    active ? 'bg-gray-100' : '',
                                    'block px-4 py-2 text-sm text-gray-700 '
                                  )}
                                >
                                  Sign In/Sign Up
                                </a>
                              </Link>
                            )
                          }
                        </Menu.Item>
                        {/* <Menu.Item>
                          {({ active }) => (
                            <a
                              href="#"
                              className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                            >
                              Settings
                            </a>
                          )}
                        </Menu.Item> */}
                        <Menu.Item>
                          {({ active }) =>
                            authenticated ? (
                              <a
                                href='#'
                                onClick={handleLogoutClick}
                                className={classNames(
                                  active ? 'bg-gray-100' : '',
                                  'block px-4 py-2 text-sm text-gray-700'
                                )}
                              >
                                Sign out
                              </a>
                            ) : (
                              <></>
                            )
                          }
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </div>
            </div>

            {/* MOBILE */}

            <Disclosure.Panel className='sm:hidden'>
              <div className='px-2 pt-2 pb-3 space-y-1'>
                <div className='flex items-center border-2 rounded-full md:shadow-sm py-2'>
                  <input
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && search()}
                    placeholder={placeholder || 'Search for anything'}
                    className='flex-1 w-300 text-sm text-gray-600 pl-5 placeholder-gray-400 outline-none bg-transparent'
                  />
                  <span className='p-1 mt-1'>|</span>
                  <SearchBox
                    className='flex-1 w-300 text-sm text-gray-600 pl-5 placeholder-gray-400 outline-none bg-transparent'
                    onSelectAddress={(address, latitude, longitude) => {
                      setValues({
                        latitude: latitude,
                        address: address,
                        longitude: longitude,
                      })
                    }}
                    defaultValue=''
                    searchBoxText='Singapore'
                  />
                  {/* flex-grow so can grow  */}
                  {/* hidden search icon, show only in medium screen */}
                  <SearchIcon
                    onClick={handleSearch}
                    className='h-8  md:inline-flex p-2 mx-auto cursor-pointer md:mx-2 rounded-full text-black'
                  />
                </div>
                {navigation.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    className={classNames(
                      item.current
                        ? 'bg-gray-900 text-white'
                        : 'text-black hover:bg-gray-700 hover:text-white',
                      'block px-3 py-2 rounded-md text-base font-medium'
                    )}
                    aria-current={item.current ? 'page' : undefined}
                  >
                    <Link href={item.href}>
                      <a>{item.name}</a>
                    </Link>
                  </Disclosure.Button>
                ))}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </header>
  )
}

export default Header
