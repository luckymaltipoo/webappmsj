import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import SmallCard from '../components/SmallCard'
import Footer from "../components/Footer";
import toast from 'react-hot-toast';
import LargeCard from '../components/LargeCard';
import Header from '../components/Header';
import axios from "axios";
import { useRouter } from "next/router";

import Banner from '../components/banner';



export default function Home({ products }) {
  const router = useRouter();


  useEffect(()=>{
    setObtainedProducts(products);
  },[])


 
  const [selectedCategory, setSelectedCategory] = useState('Everything');
  const [obtainedProducts,setObtainedProducts]=useState([]);


  const handleCategoryClick=(category)=>{
    setSelectedCategory(category);
    if (category==='Everything'){
      setObtainedProducts(products)

    }else{
      let temp=[]
      products.map((pdt)=>{
        if (pdt.category===category){
          temp.push(pdt)
        }
      });
      setObtainedProducts(temp)
    }

  }



  const notify = (message, success) => toast(message, {
    style: {
      border: success ? '1px solid green' : '1px solid red',
    },
  });
  

  const handleBannerClick=()=>{
    console.log('hi in handlebannerclick')
    if (navigator.geolocation) {

      if (!navigator.geolocation) {
        notify('Unable to retrieve your location',false)
      } else {
        console.log('Locating...');
        navigator.geolocation.getCurrentPosition((position) => {
          
          console.log(position.coords.latitude);
          console.log(position.coords.longitude);
          router.push(`/search?item=${''}&longitude=${position.coords.longitude}&latitude=${position.coords.latitude}&address=${position.coords.longitude+'-'+position.coords.latitude}`)

        }, () => {
          notify('Unable to retrieve your location',false)
        });
      }
     
    } else {
      notify('Unable to retrieve your location',false)
    }

  }

  







  return (

    <div>
      <Head>
        <title>Makeshipjoy</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      {/* <Hero /> */}
      <Banner handleClick={handleBannerClick}  />
     

      <main className='max-w-7xl mx-auto px-8 sm:px-16'>
        <section className='pt-10'>
          {/* <h2 className='text-2xl italic font-semibold text-black-600 pb-5'>Latest Products/Services</h2> */}
          <div
            className="flex overflow-x-scroll pb-3 hide-scroll-bar w-full"
          >
            <div
              className="flex flex-nowrap md:ml-10 ml-5 "
            >
              <div className="inline-block px-3 ">
                <div
                  className="w-30 h-30 overflow-hidden rounded-lg  "
                >
                  <div onClick={() => {
                    handleCategoryClick('Everything');

                  }} className={`w-full h-full flex flex-col justify-center  ${selectedCategory === 'Everything' ? 'border-b-8' : ''} `}>
                    <div className="h-20 w-20 mb-4 lg:mb-0  content-center">
                      <img src="/yellowshootingstar.png" className="h-full w-full hover:border-b-8 rounded-full overflow-hidden shadow" />
                    </div>
                    <p className='text-center text-xs pt-1 mb-2 text-black'>Everything</p>
                  </div>


                </div>
              </div>
              <div className="inline-block px-3 ">
                <div
                  className="w-30 h-30 overflow-hidden rounded-lg  "
                >
                  <div onClick={() => {
                    handleCategoryClick('Services');

                  }} className={`w-full h-full flex flex-col justify-center  ${selectedCategory === 'Services' ? 'border-b-8' : ''} `}>
                    <div className="h-20 w-20 mb-4 lg:mb-0 content-center">
                      <img src="/helping.png" className="h-full w-full hover:border-b-8 rounded-full overflow-hidden shadow" />
                    </div>
                    <p className='text-center text-xs pt-1 mb-2 text-black'>Services</p>
                  </div>


                </div>
              </div>
              <div className="inline-block px-3 ">
                <div
                  className="w-30 h-30 overflow-hidden rounded-lg  "
                >
                  <div onClick={() => {
                    handleCategoryClick('Food');

                  }} className={`w-full h-full flex flex-col justify-center  ${selectedCategory === 'Food' ? 'border-b-8' : ''} `}>
                    <div className="h-20 w-20 mb-4 lg:mb-0 content-center">
                      <img src="/food.png" className="h-full w-full hover:border-b-8 rounded-full overflow-hidden shadow" />
                    </div>
                    <p className='text-center text-xs pt-1 mb-2 text-black'>Food</p>
                  </div>


                </div>
              </div>
              <div className="inline-block px-3 ">
                <div
                  className="w-30 h-30 overflow-hidden rounded-lg  "
                >
                  <div onClick={() => {
                    handleCategoryClick('Drink');

                  }} className={`w-full h-full flex flex-col justify-center  ${selectedCategory === 'Drink' ? 'border-b-8' : ''} `}>
                    <div className="h-20 w-20 mb-4 lg:mb-0  content-center">
                      <img src="/drink.png" className="h-full w-full hover:border-b-8 rounded-full overflow-hidden shadow" />
                    </div>
                    <p className='text-center text-xs pt-1 mb-2 text-black'>Drink</p>
                  </div>


                </div>
              </div>
              <div className="inline-block px-3 ">
                <div
                  className="w-30 h-30 overflow-hidden rounded-lg  "
                >
                  <div onClick={() => {
                    handleCategoryClick('Pet Food');

                  }} className={`w-full h-full flex flex-col justify-center  ${selectedCategory === 'Pet Food' ? 'border-b-8' : ''} `}>
                    <div className="h-20 w-20 mb-4 lg:mb-0  content-center">
                      <img src="/petfood.png" className="h-full w-full hover:border-b-8 rounded-full overflow-hidden shadow" />
                    </div>
                    <p className='text-center text-xs pt-1 mb-2 text-black'>Pet Food</p>
                  </div>


                </div>
              </div>
              <div className="inline-block px-3 ">
                <div
                  className="w-30 h-30 overflow-hidden rounded-lg  "
                >
                  <div onClick={() => {
                    handleCategoryClick('Pet Services');

                  }} className={`w-full h-full flex flex-col justify-center  ${selectedCategory === 'Pet Services' ? 'border-b-8' : ''} `}>
                    <div className="h-20 w-20 mb-4 lg:mb-0  content-center">
                      <img src="/petservice-2.png" className="h-full w-full hover:border-b-8 rounded-full overflow-hidden shadow" />
                    </div>
                    <p className='text-center text-xs pt-1 mb-2 text-black'>Pet Services</p>
                  </div>


                </div>
              </div>

              <div className="inline-block px-3 ">
                <div
                  className="w-30 h-30 overflow-hidden rounded-lg  "
                >
                  <div onClick={() => {
                    handleCategoryClick('Pet Accessories');

                  }} className={`w-full h-full flex flex-col justify-center  ${selectedCategory === 'Pet Accessories' ? 'border-b-8' : ''} `}>
                    <div className="h-20 w-20 mb-4 lg:mb-0  content-center">
                      <img src="/petaccessories.png" className="h-full w-full hover:border-b-8 rounded-full overflow-hidden shadow" />
                    </div>
                    <p className='text-center text-xs pt-1 mb-2 text-black'>Pet Accessories</p>
                  </div>


                </div>
              </div>



              <div className="inline-block px-3 ">
                <div
                  className="w-30 h-30 overflow-hidden rounded-lg  "
                >
                  <div onClick={() => {
                    handleCategoryClick('Crafts');

                  }} className={`w-full h-full flex flex-col justify-center  ${selectedCategory === 'Crafts' ? 'border-b-8' : ''} `}>
                    <div className="h-20 w-20 mb-4 lg:mb-0 content-center">
                      <img src="/crafts.png" className="h-full w-full hover:border-b-8 rounded-full overflow-hidden shadow" />
                    </div>
                    <p className='text-center text-xs pt-1 mb-2 text-black'>Crafts</p>
                  </div>


                </div>
              </div>
              <div className="inline-block px-3 ">
                <div
                  className="w-30 h-30 overflow-hidden rounded-lg  "
                >
                  <div onClick={() => {
                    handleCategoryClick('Tutoring');

                  }} className={`w-full h-full flex flex-col justify-center  ${selectedCategory === 'Tutoring' ? 'border-b-8' : ''} `}>
                    <div className="h-20 w-20 mb-4 lg:mb-0  content-center">
                      <img src="/tutoring.png" className="h-full w-full hover:border-b-8 rounded-full overflow-hidden shadow" />
                    </div>
                    <p className='text-center text-xs pt-1 mb-2 text-black'>Tutoring</p>
                  </div>


                </div>
              </div>


              <div className="inline-block px-3 ">
                <div
                  className="w-30 h-30 overflow-hidden rounded-lg  "
                >
                  <div onClick={() => {
                    handleCategoryClick('Gardening');

                  }} className={`w-full h-full flex flex-col justify-center  ${selectedCategory === 'Gardening' ? 'border-b-8' : ''} `}>
                    <div className="h-20 w-20 mb-4 lg:mb-0  content-center">
                      <img src="/gardening.png" className="h-full w-full hover:border-b-8 rounded-full overflow-hidden shadow" />
                    </div>
                    <p className='text-center text-xs pt-1 mb-2 text-black'>Gardening</p>
                  </div>


                </div>
              </div>

              <div className="inline-block px-3 ">
                <div
                  className="w-30 h-30 overflow-hidden rounded-lg  "
                >
                  <div onClick={() => {
                    handleCategoryClick('Beauty');

                  }} className={`w-full h-full flex flex-col justify-center  ${selectedCategory === 'Beauty' ? 'border-b-8' : ''} `}>
                    <div className="h-20 w-20 mb-4 lg:mb-0  content-center">
                      <img src="/beauty.png" className="h-full w-full hover:border-b-8 rounded-full overflow-hidden shadow" />
                    </div>
                    <p className='text-center text-xs pt-1 mb-2 text-black'>Beauty</p>
                  </div>


                </div>
              </div>
              


            </div>
          </div>

          

          {/* on mobile grid has 1 column, sm screen 2 col, and so on */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {obtainedProducts.length>0?obtainedProducts?.map((pdt) => (

              <SmallCard
                shopName={pdt.shop.shopTitle}
                shopSlug={pdt.shop.slug}
                slug={pdt.slug}
                key={pdt._id}
                img={pdt.mainImage}
                price={pdt.price}
                rating={pdt.ratingsTotal}
                ratingCount={pdt.ratingCount}
                name={pdt.name}
                address={pdt.shop.address}
              />
            )):<div className='p-10'><span className='font-bold text-lg text-black'>Nothing in this category yet... </span></div>}

            {/* <button className='place-content-end' >See More...</button> */}
          </div>

        </section>

        <section>
          {/* <h2 className="text-4xl font-semibold py-8">Categories</h2>

          <div className="flex space-x-3 overflow-scroll scrollbar-hide p-3 -ml-3">
            {cardsData.map(({ img, title }) => (
              <MediumCard key={img + title} img={img} title={title} />
            ))}
          </div> */}
        </section>

        <LargeCard
          img="https://media.publit.io/file/homebusiness.jpeg"
          title=""
          description=""
          buttonText=""
        />
      </main>
      <Footer />

    </div>
  )
}


export async function getServerSideProps() {

  const { data } = await axios.get(
    `${process.env.api}/get-all-products`
  );
  console.log('gotten back all products ===========>>>>>>>>>>');
  console.log(data)

  // const productsData = await axios.get(`${process.env.api}/get-shop-products/${query.shopSlug}`);


  // console.log('gotten back DATA ===========>>>>>>>>>>');
  // console.log(productsData.data)

  return {
    props: {
      products: data,
      //products: productsData.data
    },
  };
}
