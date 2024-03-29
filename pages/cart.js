/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useContext, useState } from 'react'
import Header from '../components/Header'
import { axiosAuth } from '../actions/axios'
import { AuthContext } from '../context/useAuth'
import { Context } from '../context'
import { useRouter } from 'next/router'
import toast from 'react-hot-toast'

const Cart = () => {
  const router = useRouter()
  const notify = (message, success) =>
    toast(message, {
      style: {
        border: success ? '1px solid green' : '1px solid red',
      },
    })

  const {
    state: { cartItems },
    dispatch,
  } = useContext(Context)
  const {
    state: { authenticated, user },
  } = useContext(AuthContext)
  const [totalPrice, setTotalPrice] = useState(0)
  const [totalDeliveryPrice, setTotalDeliveryPrice] = useState(0)
  const [shopsInvolvedWithDelivery, setShopsInvolvedWithDelivery] = useState([])
  const [cartPayableByCash, setCartPayableByCash] = useState(0)
  const [cartPayableByCreditCard, setCartPayableByCreditCard] = useState(0)
  const [delivery, setDelivery] = useState(false)

  useEffect(() => {
    let tempList = []
    getPayableByCashOrCard(cartItems)

    cartItems.forEach((item) => {
      if (item.shipping == 'true') {
        setDelivery(true)
        let shopanddelivery = {
          shopName: item.shopName,
          deliveryFee: item.shopShippingFee,
          name: item.name,
          quantity: 1,
        }
        const alreadyinList = tempList.find(
          (item) => item.shopName == shopanddelivery.shopName
        )
        if (!alreadyinList) {
          tempList.push(shopanddelivery)
        } else {
          for (var i in tempList) {
            if (tempList[i].shopName == item.shopName) {
              tempList[i].quantity = tempList[i].quantity + 1
              break
            }
          }
        }
      }
    })

    setShopsInvolvedWithDelivery(tempList)
    getTotalShippingFee(tempList)
  }, [])

  const getPayableByCashOrCard = (list) => {
    var payableByCash = 0
    var payableByCard = 0
    list.map((item) => {
      if (item.shipping == 'false') {
        payableByCash += item.price
      } else {
        payableByCard += item.price
      }
    })
    setCartPayableByCash(payableByCash)
    setCartPayableByCreditCard(payableByCard)
  }

  const getTotalShippingFee = (list) => {
    var price = 0

    list.map((item) => {
      price += item.deliveryFee
    })

    setTotalDeliveryPrice(price)
  }

  const saveCartToDB = async () => {
    if (cartItems.length == 0) {
      notify('Nothing to check out', false)
      return
    }
    let totalCostToPay = totalPrice + totalDeliveryPrice
    let deliveryCost = totalDeliveryPrice
    if (!authenticated || user == null) {
      router.push('/login')
    } else {
      axiosAuth
        .post(`/cart`, {
          cartItems,
          totalCostToPay,
          deliveryCost,
          cartPayableByCash,
          cartPayableByCreditCard,
          delivery,
        })
        .then((res) => {
          if (res.data.ok) {
            router.push('/checkout')
          }
        })
        .catch((err) => {})
    }
  }

  useEffect(() => {
    let price = 0

    cartItems.map((item) => {
      price = price + item.inclusivePrice
    })

    setTotalPrice(price)
  }, [])

  const handlePrdtRemove = (product) => {
    //deduct from totalprice
    let price = totalPrice - product.inclusivePrice
    setTotalPrice(price)
    for (var i in shopsInvolvedWithDelivery) {
      if (
        shopsInvolvedWithDelivery[i].shopName == product.shopName &&
        shopsInvolvedWithDelivery[i].name == product.name
      ) {
        if (shopsInvolvedWithDelivery[i].quantity - 1 == 0) {
          shopsInvolvedWithDelivery.pop(i)
        } else {
          shopsInvolvedWithDelivery[i].quantity =
            shopsInvolvedWithDelivery[i].quantity - 1
        }
        break
      }
    }
    if (product.shipping == 'true') {
      let newpayablebycard = cartPayableByCreditCard - product.price
      setCartPayableByCreditCard(newpayablebycard)
    } else {
      let newpayablebycash = cartPayableByCash - product.price
      setCartPayableByCash(newpayablebycash)
    }

    setShopsInvolvedWithDelivery(shopsInvolvedWithDelivery)
    getTotalShippingFee(shopsInvolvedWithDelivery)

    dispatch({
      type: 'REMOVEFROMCART',
      payload: product,
    })
  }

  return (
    <>
      <Header />

      <div
        className='w-full h-full bg-black bg-opacity-90 top-0 overflow-y-auto overflow-x-hidden fixed sticky-0'
        id='chec-div'
      >
        <div
          className='w-full absolute z-10 right-0 h-full overflow-x-hidden transform translate-x-0 transition ease-in-out duration-700'
          id='checkout'
        >
          <div className='flex md:flex-row flex-col justify-end' id='cart'>
            <div
              className='w-full md:pl-10 pl-4 pr-10 md:pr-4 md:py-12 py-8 bg-white overflow-y-auto overflow-x-hidden h-screen'
              id='scroll'
            >
              <p className='text-5xl font-black leading-10 text-gray-800 pt-10'>
                Bag
              </p>
              {cartItems.length == 0 ? (
                <>
                  <h2 className='p-10'>Nothing in cart yet</h2>
                </>
              ) : (
                cartItems.map((item) => (
                  <div
                    key={item.name}
                    className='md:flex items-center mt-14 py-8 border-t border-gray-200'
                  >
                    <div className='w-1/4'>
                      <img
                        src={item.mainImage}
                        alt='Product Image'
                        className='w-full h-full object-center object-cover'
                      />
                    </div>
                    <div className='md:pl-3 md:w-3/4'>
                      <p className='text-xs leading-3 text-gray-800 md:pt-0 pt-4'>
                        {item.shop.shopTitle}
                      </p>
                      <div className='flex items-center justify-between w-full pt-1'>
                        <p className='text-base font-black leading-none text-gray-800'>
                          {item.name}
                        </p>
                      </div>

                      <div className='flex items-center justify-between pt-5 pr-6'>
                        <div className='flex itemms-center'>
                          <p
                            className='text-xs leading-3 underline text-red-500 pl-5 cursor-pointer'
                            onClick={() => handlePrdtRemove(item)}
                          >
                            Remove
                          </p>
                        </div>
                        {item.shipping == 'true' ? (
                          <p>Includes Shop Delivery</p>
                        ) : (
                          <></>
                        )}
                        <p className='text-base font-black leading-none text-gray-800'>
                          ${item.inclusivePrice}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
            <div className='xl:w-1/2 md:w-1/3 xl:w-1/4 w-full bg-gray-100 h-full'>
              <div className='flex flex-col md:h-screen px-14 py-20 justify-between overflow-y-auto'>
                <div></div>
                <div>
                  <div className='flex items-center pb-6 justify-between lg:pt-5 pt-20'>
                    <p className='text-2xl leading-normal text-gray-800'>
                      Total Delivery
                    </p>
                    <p className='text-2xl font-bold leading-normal text-right text-gray-800'>
                      ${totalDeliveryPrice}
                    </p>
                  </div>
                  <div className=' flex flex-col'>
                    <p className='text-sm font-bold'>Delivery Cost: </p>
                    {shopsInvolvedWithDelivery.map((item) => (
                      <p key={item} className='text-sm italic'>
                        {item.shopName} - ${item.deliveryFee}
                      </p>
                    ))}
                  </div>
                  <div className='flex items-center pb-6 justify-between lg:pt-5 pt-20'>
                    <p className='text-2xl leading-normal text-gray-800'>
                      Total
                    </p>
                    <p className='text-2xl font-bold leading-normal text-right text-gray-800'>
                      ${totalPrice + totalDeliveryPrice}
                    </p>
                  </div>
                  <button
                    onClick={saveCartToDB}
                    className='text-base leading-none w-full py-5 bg-gray-800 border-gray-800 border focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 text-white'
                  >
                    Checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Cart
