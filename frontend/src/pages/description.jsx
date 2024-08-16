import { faCheckCircle, faChevronDown, faChevronUp, faCircle, faMapMarkerAlt, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getDestinationByIdApi, getYouMayLikeDataApi, contactUsApi } from '../apis/Api';
import BookingForm from './booking';

const DescriptionPage = () => {
  const { id } = useParams();
  const [destination, setDestinations] = useState({});
  const [youMayLike, setYouMayLike] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contact: '',
    subject: '',
    message: ''
  });

  useEffect(() => {
    getDestinationByIdApi(id).then((res) => {
      if (res.data.success) {
        setDestinations(res.data.destination)
      } else {
        toast.error('Something went wrong while fetching single destination')
      }
    })

    getYouMayLikeDataApi(id).then((res) => {
      if (res.data.success) {
        setYouMayLike(res.data.likeData)
      } else {
        toast.error('Something went wrong while fetching you may like data')
      }
    })
  }, [id]);

  const [activeTab, setActiveTab] = useState('overview');
  const [faqs, setFaqs] = useState([
    {
      "question": "Do I need a visa to travel to Nepal?",
      "answer": "Yes, most travelers need a visa to enter Nepal. You can obtain a visa on arrival at Tribhuvan International Airport in Kathmandu or at land border crossings. Alternatively, you can apply for a visa at a Nepalese embassy or consulate in your country.",
      "isOpen": false
  },
  {
      "question": "What is the best time to visit Nepal?",
      "answer": "The best time to visit Nepal is during the spring (March to May) and autumn (September to November) seasons. These periods offer pleasant weather, clear skies, and excellent visibility for trekking and sightseeing.",
      "isOpen": false
  },
  {
      "question": "What currency is used in Nepal?",
      "answer": "The currency used in Nepal is the Nepalese Rupee (NPR). It is advisable to carry some cash, especially in rural areas, as not all places accept credit or debit cards.",
      "isOpen": false
  },
  {
      "question": "Is Nepal safe for travelers?",
      "answer": "Nepal is generally safe for travelers. However, it's always wise to take standard precautions, such as avoiding isolated areas at night, keeping an eye on your belongings, and being cautious of scams in tourist areas.",
      "isOpen": false
  },
  {
      "question": "What should I pack for a trip to Nepal?",
      "answer": "Pack according to the season and activities planned. Essentials include comfortable clothing, sturdy walking shoes, a hat, sunscreen, a reusable water bottle, a first aid kit, and any personal medications. For trekking, pack layers, a good backpack, and trekking gear.",
      "isOpen": false
  },
  {
      "question": "Do I need any vaccinations to travel to Nepal?",
      "answer": "It's recommended to check with your doctor or a travel clinic for the latest vaccination advice. Common vaccinations include Hepatitis A, Typhoid, and Tetanus. Depending on your travel plans, you might also consider vaccinations for Rabies and Japanese Encephalitis.",
      "isOpen": false
  },
  {
      "question": "Can I use my mobile phone in Nepal?",
      "answer": "Yes, you can use your mobile phone in Nepal. Consider purchasing a local SIM card for better rates on calls and data. Major cities and tourist areas have good network coverage, but it can be spotty in remote areas.",
      "isOpen": false
  },
  {
      "question": "What is the food like in Nepal?",
      "answer": "Nepalese cuisine includes a variety of dishes, with Dal Bhat (lentil soup with rice) being a staple. You can also find international cuisines in cities like Kathmandu and Pokhara. Be cautious with street food and drink bottled or purified water to avoid stomach issues.",
      "isOpen": false
  },
  {
      "question": "How can I get around in Nepal?",
      "answer": "In cities, you can use taxis, rickshaws, and public buses. For longer distances, consider domestic flights or tourist buses. For trekking routes, walking is the primary mode of transportation, though some areas might have jeep services.",
      "isOpen": false
  },
  {
      "question": "Do people in Nepal speak English?",
      "answer": "English is widely spoken in tourist areas, hotels, and by those working in the tourism industry. However, learning a few basic Nepali phrases can enhance your travel experience and help you connect with locals.",
      "isOpen": false
  }
  ]);

  const toggleFaq = index => {
    setFaqs(faqs.map((faq, i) => {
      if (i === index) {
        faq.isOpen = !faq.isOpen;
      }
      return faq;
    }));
  };

  const toggleForm = () => setShowForm(!showForm);

  const handleContactChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await contactUsApi(formData);
      if (response.data.success) {
        toast.success(response.data.message);
        setFormData({
          name: '',
          email: '',
          contact: '',
          subject: '',
          message: ''
        });
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error('Error submitting contact form: ' + error.message);
    }
  };

  return (
    <div className="container mx-auto px-4 py-4">
      {/* Breadcrumb */}

      <h1 className="text-4xl font-bold mb-4">{destination.destinationName}</h1>
      <img src={destination.destinationImageUrl} alt="Annapurna Base Camp" className="w-full rounded-lg shadow-lg mb-6" />

      {/* Tabs */}
      <div className="bg-gray-100 p-6 rounded-lg shadow-lg mb-6">
        <div className="flex justify-around mb-6">
          <button
            className={`py-2 px-6 font-semibold rounded-md ${activeTab === 'overview' ? 'bg-[#54A15D] text-white' : 'text-gray-600 hover:bg-green-100'}`}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button
            className={`py-2 px-6 font-semibold rounded-md ${activeTab === 'itinerary' ? 'bg-[#54A15D] text-white' : 'text-gray-600 hover:bg-green-100'}`}
            onClick={() => setActiveTab('itinerary')}
          >
            Itinerary
          </button>
          <button
            className={`py-2 px-6 font-semibold rounded-md ${activeTab === 'cost' ? 'bg-[#54A15D] text-white' : 'text-gray-600 hover:bg-green-100'}`}
            onClick={() => setActiveTab('cost')}
          >
            Cost
          </button>

          <button
            className={`py-2 px-6 font-semibold rounded-md ${activeTab === 'faqs' ? 'bg-[#54A15D] text-white' : 'text-gray-600 hover:bg-green-100'}`}
            onClick={() => setActiveTab('faqs')}
          >
            Faqs
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="mt-6 text-gray-700 leading-relaxed">
            <p>{destination.description}</p>
          </div>
        )}

        {activeTab === 'itinerary' && (
          <div className="mt-6 text-gray-700 leading-relaxed">
            <div className="space-y-8">
              {[
                {
                  day: 'Day 1',
                  title: 'Pokhara to Nayapul to Ghandruk',
                  description:
                    'Starting early morning, you’ll drive from Pokhara to Nayapul, a journey of about 1.5 hours. From Nayapul, the trek to Ghandruk begins, taking approximately 5-6 hours. Ghandruk, a beautiful Gurung village, offers stunning views of Annapurna South and Machhapuchhare. You’ll spend the night in a guesthouse in Ghandruk.',
                  icon: faMapMarkerAlt,
                },
                {
                  day: 'Day 2',
                  title: 'Ghandruk to Chhomrong',
                  description:
                    'The trek from Ghandruk to Chhomrong takes around 5-6 hours. Along the way, you’ll pass through scenic terraces and Rhododendron forests, and cross the Kimrong Khola. Chhomrong, perched at 2170 meters, is a charming village with spectacular mountain views. Overnight accommodation will be in a guesthouse in Chhomrong.',
                },
                {
                  day: 'Day 3',
                  title: 'Chhomrong to Dovan',
                  description:
                    'Leaving Chhomrong, the trail descends to the Chhomrong Khola before climbing up through forests of bamboo, Rhododendron, and oak to reach Dovan at 2500 meters. This segment of the trek takes about 6-7 hours. You’ll stay overnight in a guesthouse in Dovan.',
                },
                {
                  day: 'Day 4',
                  title: 'Dovan to Deurali',
                  description:
                    'The trek from Dovan to Deurali, which takes around 4-5 hours, passes through dense forests and the famous Hinku Cave. As you ascend, the landscape starts to change, offering new and captivating views. Deurali, located at 3230 meters, is where you’ll spend the night in a guesthouse.',
                },
                {
                  day: 'Day 5',
                  title: 'Deurali to Annapurna Base Camp (ABC) via Machapuchare Base Camp (MBC)',
                  description:
                    'From Deurali, you’ll trek to Annapurna Base Camp, passing through Machapuchare Base Camp. This segment, taking about 5-6 hours, offers stunning views of Machapuchare, Annapurna I, and other peaks, as you walk through the alpine landscape. At 4130 meters, ABC provides breathtaking panoramas. You’ll spend the night in a guesthouse at ABC.',
                },
                {
                  day: 'Day 6',
                  title: 'ABC to Bamboo',
                  description:
                    'Retracing your steps, you’ll trek from ABC to Bamboo, a journey of about 6-7 hours. This descent allows you to enjoy different perspectives of the landscape you saw on the way up. Overnight accommodation will be in a guesthouse in Bamboo at 2310 meters.',
                },
                {
                  day: 'Day 7',
                  title: 'Bamboo to Jhinu Danda and drive to Pokhara',
                  description:
                    'On the final day of trekking, you’ll hike from Bamboo to Jhinu Danda, which takes around 5-6 hours. Jhinu Danda is known for its hot springs, where you can relax and rejuvenate. From Jhinu Danda, a jeep will take you back to Pokhara. You’ll spend the night in a hotel in Pokhara, reflecting on the incredible journey you’ve just completed.',
                  icon: faMapMarkerAlt,
                },
              ].map((item, index) => (
                <div className="flex items-start space-x-4" key={index}>
                  <div className="flex flex-col items-center">
                    {item.icon ? (
                      <FontAwesomeIcon icon={item.icon} className="text-[#54A15D] text-2xl" />
                    ) : (
                      <FontAwesomeIcon icon={faCircle} className="text-[#54A15D] text-2xl" />
                    )}
                    {index < 6 && <div className="h-full border-l-2 border-[#54A15D]"></div>}
                  </div>
                  <div>
                    <h4 className="text-xl font-bold">{item.day}: {item.title}</h4>
                    <p>{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'cost' && (
          <div className="mt-6 text-gray-700 leading-relaxed">
            <h3 className="text-2xl font-bold mb-4">The Trip Cost Includes</h3>
            <ul className="mb-6">
              {[
                'Pick-up or Drop-off service from and to Airport(in our own vehicle)',
                'Transportation to and from!!',
                'Food all along the trip(Breakfast, Lunch, Dinner and a cup of coffee or tea) and accommodations during the trip in hotels with family environment',
                'Transportation, food, accommodation and insurance of Guide during the trip',
                'Down jacket, all-season sleeping bag, duffel bag and trekking map(in case if you don’t have your own. Down jacket, sleeping bag and duffel bag must be returned after completion of the trip)',
                'First Aid Medical Kit(Your guide will carry the Medical Kit but we also advise to bring yourself for your own use, as far as possible)',
                'All the required permits and paperwork',
              ].map((item, index) => (
                <li key={index} className="flex items-start space-x-2 mb-2">
                  <FontAwesomeIcon icon={faCheckCircle} className="text-[#54A15D]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <h3 className="text-2xl font-bold mb-4">The Trip Cost Excludes</h3>
            <ul>
              {[
                'International Airfare',
                'Visa Charges',
                'Hotel Expenses(In Kathmandu, some packages do include hotel expenses)',
                'Your travel and medical insurance',
                'Personal Expenses such as shopping, bar bills, hot shower, telephone, laundry, titbits etc',
                'Food and accommodations in Kathmandu',
                'Services not mentioned or not promised by the agent/agency',
                'Emergency expenses such as expenses on chartered helicopter.',
              ].map((item, index) => (
                <li key={index} className="flex items-start space-x-2 mb-2">
                  <FontAwesomeIcon icon={faTimesCircle} className="text-red-500" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}


        {/* FAQs Section */}
        {activeTab === 'faqs' && (
          <div className=" mb-6">
            {faqs.map((faq, index) => (
              <div key={index} className="mb-4">
                <button onClick={() => toggleFaq(index)} className="flex justify-between items-center w-full p-4 text-left text-gray-800 bg-white rounded-lg shadow">
                  <span>{faq.question}</span>
                  <FontAwesomeIcon icon={faq.isOpen ? faChevronUp : faChevronDown} />
                </button>
                {faq.isOpen && (
                  <div className="mt-2 p-4  text-gray-700 rounded-b-lg">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex flex-col md:flex-row">
        {/* Inquiry Form */}
        <div className="bg-gray-100 p-6 rounded-lg shadow-lg md:w-1/2 mb-6 md:mb-0 md:mr-6">
          <h3 className="text-xl font-bold mb-4">You can send your enquiry via the form below.</h3>
          <form className='flex flex-col' onSubmit={handleContactSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block mb-2 font-semibold">Enter Your Name *</label>
              <input 
                type="text" 
                id="name" 
                name="name"
                value={formData.name}
                onChange={handleContactChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none" 
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block mb-2 font-semibold">Enter Your Email *</label>
              <input 
                type="email" 
                id="email" 
                name="email"
                value={formData.email}
                onChange={handleContactChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none" 
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="contact" className="block mb-2 font-semibold">Enter Your Contact *</label>
              <input 
                type="text" 
                id="contact" 
                name="contact"
                value={formData.contact}
                onChange={handleContactChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none" 
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="subject" className="block mb-2 font-semibold">Enquiry Subject</label>
              <input 
                type="text" 
                id="subject" 
                name="subject"
                value={formData.subject}
                onChange={handleContactChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none" 
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="message" className="block mb-2 font-semibold">Enter Your Message *</label>
              <textarea 
                id="message" 
                name="message"
                value={formData.message}
                onChange={handleContactChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none" 
                rows="4"
                required
              ></textarea>
            </div>
            <button type="submit" className="bg-[#54A15D] hover:bg-[#54A15D] text-white py-2 px-4 rounded-md">SEND EMAIL</button>
          </form>
        </div>

        <div className='bg-gray-100 p-6 rounded-lg shadow-lg md:w-1/2'>
          <iframe
            src={destination.map}
            width="100%" // Set width to 100% to fill the container
            height="100%" // Adjust height as needed
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>

      {/* Book Now Button */}
      <div className="flex justify-center my-8">
        <Link to={`/booking/${destination._id}`} className="bg-[#54A15D] hover:bg-green-700 text-white font-bold py-2 px-8 rounded-full">
          Book Now
        </Link>
      </div>
      {showForm && <BookingForm onClose={toggleForm} />}

      {/* You Might Also Like */}
      <div className="mt-8">
        <h3 className="text-2xl font-bold text-center mb-4">You Might Also Like</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {youMayLike.map((data, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img src={data.destinationImageUrl} alt={data.destinationName} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h4 className="text-xl font-bold mb-2">{data.destinationName}</h4>
                <p className="text-gray-700 mb-2">{data.district}</p>
                <p className="text-[#54A15D] font-semibold">Starting From Rs. {data.price}</p>
                <button className="mt-4 bg-[#54A15D] hover:bg-[#54A15D] text-white py-2 px-4 rounded-md">See More</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DescriptionPage;
