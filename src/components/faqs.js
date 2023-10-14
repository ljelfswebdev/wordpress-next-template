import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useGlobalsContext } from '../utils/fetchGlobals';

const Faqs = () => {
  const globalsData = useGlobalsContext();
  const [faqs, setFaqs] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null); // Initialize as null to start with no active item.

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const apiBaseUrl = process.env.NEXT_PUBLIC_WORDPRESS_API_URL;
        const response = await axios.get(`${apiBaseUrl}/faq`, {
          params: {
            _fields: 'id,title,acf',
          },
        });

        setFaqs(response.data);
      } catch (error) {
        console.error('Error fetching Faqs:', error);
      }
    };

    fetchFaqs();
  }, []);

  const handleItemClick = (index) => {
    if (index === activeIndex) {
      // If the clicked item is already active, deactivate it.
      setActiveIndex(null);
    } else {
      // Set the clicked item as active.
      setActiveIndex(index);
    }
  };

  return (
    <section className="faqs">
      <div className="container">
        <div className="faqs-content">
          <div className="faqs-content-title">
            <span></span>{globalsData.acf.faqs_title}<span></span>
          </div>
          <div
            className="faqs-content-subtitle"
            dangerouslySetInnerHTML={{ __html: globalsData.acf.faqs_subtitle }}
          ></div>
          <div className="faqs-content-accordion">
            {faqs.map((faq, index) => (
              <div
                className={`faqs-content-accordion-item ${index === activeIndex ? 'faqs-content-accordion-item--active' : ''}`}
                key={faq.title.rendered}
                onClick={() => handleItemClick(index)}
              >
                <div
                  className={`faqs-content-accordion-item-button ${index === activeIndex ? 'faqs-content-accordion-item-button--active' : ''}`}
                >
                  {faq.title.rendered}
                  <div className="faqs-content-accordion-item-button-cross">
                    <span></span>
                    <span></span>
                  </div>
                </div>
                <div
                  className={`faqs-content-accordion-item-answer ${index === activeIndex ? 'faqs-content-accordion-item-answer--active' : ''}`}
                >
                  {faq.acf.faq_answer}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Faqs;
