"use client";

// components/Homepage.js
import React, { useEffect, useState } from 'react';
import '../styles/pages/homepage.scss';
import axios from 'axios';
import { fetchImageURL } from '../utils/image';
import { useGlobalsContext } from '../utils/fetchGlobals';
import { fetchPageData } from '../utils/fetchPageData';
import ServiceSwiper from '../components/service-swiper';
import Faqs from '../components/faqs'

const Homepage = () => {
  const globalsData = useGlobalsContext();
  const [pageData, setPageData] = useState(null);
  const [bannerImageURL, setBannerImageURL] = useState(null);

  useEffect(() => {
    const slug = 'homepage'; // Change this to the desired page slug
    fetchPageData(slug)
      .then((data) => {
        setPageData(data);

        // Fetch the banner image URL
        const bannerImageID = data.acf.banner_image;
        if (bannerImageID) {
          fetchImageURL(bannerImageID)
            .then((url) => setBannerImageURL(url))
            .catch((error) => {
              console.log('Error fetching this image')
            });
        }
      })
      .catch((error) => {
        console.log('Error fetching page data');
      });
  }, []);

  if (!pageData) {
    return( 
    <div className="loading">
      <img src="/loading.gif"/>
    </div> );
  }

  return (
    <>
      <section className="homepage__banner">
        {/* Use the fetched bannerImageURL */}
        {bannerImageURL && (
          <img src={bannerImageURL} alt="Hero Banner" className="homepage__banner-background"/>
        )}
        <div className="homepage__banner-overlay"></div>
        <div className="container">
          <div className="homepage__banner-content">
            <div className="homepage__banner-content-green">
              {pageData.acf.banner_green_text}
            </div>
            <div className="homepage__banner-content-main">
              {pageData.acf.banner_main_title}
            </div>
            <div className="homepage__banner-content-sub">
              {pageData.acf.banner_sub_text}
            </div>
          </div>
        </div>
      </section>
      <section className="homepage__usps"></section>

      <ServiceSwiper/>

      <Faqs/>
      
    </>
  );
};

export default Homepage;
