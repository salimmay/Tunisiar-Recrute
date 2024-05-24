import { useEffect, useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XIcon, PlusSmIcon } from "@heroicons/react/outline";
import OfferFilter from "../offers/OfferFilter";
import OfferItemSection from "../offers/OfferItemSection";
import { API_URL } from "../../config";

const AllOffers = () => {
  const [offers, setOffers] = useState([]);
  const [filteredOffers, setFilteredOffers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchDepartment, setSearchDepartment] = useState("");
  const [searchLocation, setSearchLocation] = useState("");
  const [searchType, setSearchType] = useState("");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  
  useEffect(() => {
    // Function to fetch data from the API
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_URL}/internshipOffers`,);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setOffers(data);
        setFilteredOffers(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData(); // Call the function to fetch data when component mounts
  }, []);

  useEffect(() => {
    // Filtering logic remains the same as before
      const filtered = offers.filter((offer) => {
      const titleMatch = offer.title.toLowerCase().includes(searchTerm.toLowerCase());
      const departmentMatch = offer.department.toLowerCase().includes(searchDepartment.toLowerCase());
      const locationMatch = offer.location.toLowerCase().includes(searchLocation.toLowerCase());
      const typeMatch = !searchType || offer.type.toLowerCase().includes(searchType.toLowerCase());
      return titleMatch && departmentMatch && locationMatch && typeMatch;
    });
    setFilteredOffers(filtered);
  }, [offers, searchTerm, searchDepartment, searchLocation, searchType]);

  // Rest of the component remains unchanged
  return (
    <div className="bg-white">
    <div>
      {/* Mobile filter dialog */}
      <Transition.Root show={mobileFiltersOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 flex z-40 lg:hidden"
          onClose={setMobileFiltersOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full"
          >
            <div className="ml-auto relative max-w-xs w-full h-full bg-white shadow-xl py-4 pb-6 flex flex-col overflow-y-auto">
              <div className="px-4 flex items-center justify-between">
                <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                <button
                  type="button"
                  className="-mr-2 w-10 h-10 p-2 flex items-center justify-center text-gray-400 hover:text-gray-500"
                  onClick={() => setMobileFiltersOpen(false)}
                >
                  <span className="sr-only">Close menu</span>
                  <XIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>

              {/* Filters */}
              <form className="mt-4">
                <OfferFilter
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                  searchDepartment={searchDepartment}
                  setSearchDepartment={setSearchDepartment}
                  searchLocation={searchLocation}
                  setSearchLocation={setSearchLocation}
                  searchType={searchType}
                  setSearchType={setSearchType}
                />
              </form>
            </div>
          </Transition.Child>
        </Dialog>
      </Transition.Root>

      <main className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="border-b border-gray-200 pb-10">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">
            New Offers
          </h1>
          <p className="mt-4 text-base text-gray-500">
            Checkout out the latest release of Basic Tees, new and improved
            with four openings!
          </p>
        </div>

        <div className="pt-12 lg:grid lg:grid-cols-2 lg:gap-x-8 xl:grid-cols-4">
          <aside>
            <h2 className="sr-only">Filters</h2>
            <button
              type="button"
              className="inline-flex items-center lg:hidden"
              onClick={() => setMobileFiltersOpen(true)}
            >
              <span className="text-sm font-medium text-gray-700">
                Filters
              </span>
              <PlusSmIcon
                className="flex-shrink-0 ml-1 h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </button>
            <div className="hidden lg:block">
              <form className="divide-y divide-gray-200 space-y-10">
                <OfferFilter
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                  searchDepartment={searchDepartment}
                  setSearchDepartment={setSearchDepartment}
                  searchLocation={searchLocation}
                  setSearchLocation={setSearchLocation}
                  searchType={searchType}
                  setSearchType={setSearchType}
                />
              </form>
            </div>
          </aside>
          <div className="mt-6 lg:mt-0 lg:col-span-1 xl:col-span-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
            {filteredOffers.map((Offer) => (
              <div key={Offer.id}>
                <OfferItemSection Offer={Offer} />
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  </div>
);
};


export default AllOffers;
