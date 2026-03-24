import {
  Building2,
  MapPin,
  IndianRupee,
  BedDouble,
  Bath,
  Maximize,
  Zap,
  Droplets,
  Car,
  CheckCircle2,
  ArrowLeft,
  Loader2,
} from "lucide-react";
import { useState } from "react";
import { serverUrl } from "../main";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setPropertyData } from "../redux/ownerSlice";
import { toast } from "sonner";

const AddProperty = () => {
  const navigate = useNavigate();
  const [propertyName, setPropertyName] = useState("");
  const [propertyType, setpropertyType] = useState("");
  const [address, setaddress] = useState("");
  const [city, setcity] = useState("");
  const [state, setstate] = useState("");
  const [pincode, setpincode] = useState("");
  const [bedrooms, setbedrooms] = useState("");
  const [bathrooms, setbathrooms] = useState("");
  const [areaSqft, setareaSqft] = useState("");
  const [rent,setrent]=useState("")
  const [hasParking, sethasParking] = useState(false);
  const [hasWaterConnection, sethasWaterConnection] = useState(false);
  const [hasElectricityConnection, sethasElectricityConnection] =
    useState(false);
  const [frontendImage, setFrontendImage] = useState(null);
  const [Backendimage, setBackendimage] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState("");
  const dispatch = useDispatch();

  const handleImage = (e) => {
    const file = e.target.files[0];
    setBackendimage(file);
    setFrontendImage(URL.createObjectURL(file));
  };

  


const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    setIsLoading(true);

    const formData = new FormData();
    formData.append("propertyName", propertyName);
    formData.append("propertyType", propertyType);
    formData.append("address", address);
    formData.append("city", city);
    formData.append("state", state);
    formData.append("pincode", pincode);
    formData.append("bedrooms", bedrooms);
    formData.append("bathrooms", bathrooms);
    formData.append("areaSqft", areaSqft);
    formData.append("hasParking", hasParking);
    formData.append("hasElectricityConnection", hasElectricityConnection);
    formData.append("hasWaterConnection", hasWaterConnection);
    formData.append("rent",rent),
    formData.append("image", Backendimage); // ✅ File object goes here

    const result = await axios.post(
      `${serverUrl}/api/property/create`,
      formData,
      {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" }, // ✅ important
      }
    );

    if(result.data.success){
      navigate("/owner/properties")
    }
    dispatch(setPropertyData(result.data.property));
    setErr("");
    toast.success(data.message)

  } catch (error) {
    setErr(error.response?.data?.message || "Something went wrong");
    toast.error(error.response?.data?.message || "Something went wrong");
  } finally {
    setIsLoading(false);
  }
};


  return (
    <div className="p-8 bg-gray-50/50 min-h-screen h-500">
      <div className="max-w-3xl mx-auto">
        {/* Breadcrumb & Header */}
        <button
          onClick={() => navigate("/owner/properties")}
          className="flex items-center gap-2 text-gray-500 hover:text-indigo-600 transition-colors mb-4 group"
        >
          <ArrowLeft
            size={18}
            className="group-hover:-translate-x-1 transition-transform"
          />
          <span className="text-sm font-medium">Back to Properties</span>
        </button>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
            Add New Property
          </h1>
          <p className="text-gray-500 mt-1">
            Fill in the details below to list a new unit in your portfolio.
          </p>
        </div>

        {/* Main Form Card */}
        <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden">
          <div className="p-8 space-y-10">
            {/* Section 1: Basic Info */}
            <section className="space-y-6">
              <div className="flex items-center gap-2 pb-2 border-b border-gray-50">
                <Building2 className="text-indigo-600" size={20} />
                <h3 className="font-bold text-gray-800">Basic Information</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">
                    Property Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Green Villa"
                    className="w-full bg-gray-50 border-none ring-1 ring-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all outline-none"
                    onChange={(e) => setPropertyName(e.target.value)}
                    value={propertyName}
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">
                    Property Type
                  </label>
                  <select
                    value={propertyType}
                    onChange={(e) => setpropertyType(e.target.value)}
                    className="w-full bg-gray-50 border-none ring-1 ring-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all outline-none appearance-none"
                  >
                    <option value="">Select Type</option>
                    <option value="Apartment">Apartment</option>
                    <option value="Independent House">Independent House</option>
                    <option value="Villa">Villa</option>
                    <option value="PG">PG</option>
                    <option value="Commercial">Commercial</option>
                  </select>
                </div>
              </div>
            </section>

            {/* {image} */}

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">
                property Image
              </label>

              <input
                type="file"
                accept="image/*"
                className="w-full bg-gray-50 border-none ring-1 ring-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all outline-none"
                onChange={handleImage}
              />
              {frontendImage && (
                <div className="mt-4">
                  <img
                    src={frontendImage}
                    alt=""
                    className="w-full h-48 object-cover rounded-lg border"
                  />
                </div>
              )}
            </div>

            {/* Section 2: Location */}
            <section className="space-y-6">
              <div className="flex items-center gap-2 pb-2 border-b border-gray-50">
                <MapPin className="text-indigo-600" size={20} />
                <h3 className="font-bold text-gray-800">Location Details</h3>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">
                  Full Address
                </label>
                <textarea
                  rows="2"
                  placeholder="Street, Area, Landmark..."
                  className="w-full bg-gray-50 border-none ring-1 ring-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all outline-none"
                  onChange={(e) => setaddress(e.target.value)}
                  value={address}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">
                    City
                  </label>
                  <input
                    type="text"
                    className="w-full bg-gray-50 border-none ring-1 ring-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all outline-none"
                    onChange={(e) => setcity(e.target.value)}
                    value={city}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">
                    State
                  </label>
                  <input
                    type="text"
                    className="w-full bg-gray-50 border-none ring-1 ring-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all outline-none"
                    onChange={(e) => setstate(e.target.value)}
                    value={state}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">
                    Pincode
                  </label>
                  <input
                    type="number"
                    className="w-full bg-gray-50 border-none ring-1 ring-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all outline-none"
                    onChange={(e) => setpincode(e.target.value)}
                    value={pincode}
                  />
                </div>
              </div>
            </section>

            {/* Section 3: Configuration & Pricing */}
            <section className="space-y-6">
              <div className="flex items-center gap-2 pb-2 border-b border-gray-50">
                <IndianRupee className="text-indigo-600" size={20} />
                <h3 className="font-bold text-gray-800">
                  Specifications & Rent
                </h3>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1 flex items-center gap-1">
                    <BedDouble size={12} /> Bedrooms
                  </label>
                  <input
                    type="number"
                    placeholder="0"
                    className="w-full bg-gray-50 border-none ring-1 ring-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all outline-none"
                    onChange={(e) => setbedrooms(e.target.value)}
                    value={bedrooms}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1 flex items-center gap-1">
                    <Bath size={12} /> Bathrooms
                  </label>
                  <input
                    type="number"
                    placeholder="0"
                    className="w-full bg-gray-50 border-none ring-1 ring-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all outline-none"
                    onChange={(e) => setbathrooms(e.target.value)}
                    value={bathrooms}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1 flex items-center gap-1">
                    <Maximize size={12} /> Area (sqft)
                  </label>
                  <input
                    type="number"
                    placeholder="Sqft"
                    className="w-full bg-gray-50 border-none ring-1 ring-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all outline-none"
                    onChange={(e) => setareaSqft(e.target.value)}
                    value={areaSqft}
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1 flex items-center gap-1">
                    rent
                  </label>
                  <input
                    type="number"
                    placeholder="20000"
                    className="w-full bg-gray-50 border-none ring-1 ring-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all outline-none"
                    onChange={(e) => setrent(e.target.value)}
                    value={rent}
                  />
                </div>
              </div>
            </section>

            {/* Section 4: Facilities & Connections */}
            <section className="space-y-6">
              <div className="flex items-center gap-2 pb-2 border-b border-gray-50">
                <Zap className="text-indigo-600" size={20} />
                <h3 className="font-bold text-gray-800">
                  Facilities & Connections
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Parking checkbox styled as a toggle/card */}
                <label className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100 cursor-pointer hover:bg-indigo-50/50 transition-colors group">
                  <div className="flex items-center gap-3">
                    <Car
                      size={18}
                      className="text-gray-400 group-hover:text-indigo-600"
                    />
                    <span className="text-sm font-medium text-gray-700">
                      Has Parking
                    </span>
                  </div>
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    checked={hasParking}
                    onChange={(e) => sethasParking(e.target.checked)}
                  />
                </label>

                <label className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100 cursor-pointer hover:bg-indigo-50/50 transition-colors group">
                  <div className="flex items-center gap-3">
                    <Droplets
                      size={18}
                      className="text-gray-400 group-hover:text-indigo-600"
                    />
                    <span className="text-sm font-medium text-gray-700">
                      Water Conn.
                    </span>
                  </div>
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    checked={hasWaterConnection}
                    onChange={(e) => sethasWaterConnection(e.target.checked)}
                  />
                </label>

                <label className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100 cursor-pointer hover:bg-indigo-50/50 transition-colors group">
                  <div className="flex items-center gap-3">
                    <Zap
                      size={18}
                      className="text-gray-400 group-hover:text-indigo-600"
                    />
                    <span className="text-sm font-medium text-gray-700">
                      Electricity Conn.
                    </span>
                  </div>
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    checked={hasElectricityConnection}
                    onChange={(e) =>
                      sethasElectricityConnection(e.target.checked)
                    }
                  />
                </label>
              </div>
            </section>
          </div>

          <div className="bg-gray-50 px-8 py-6 flex items-center justify-end gap-3 border-t border-gray-100">
            <button
              onClick={() => navigate("/owner/properties")}
              className="px-6 py-2.5 rounded-xl text-sm font-bold text-gray-500 hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-2.5 rounded-xl text-sm font-bold shadow-lg shadow-indigo-200 transition-all active:scale-95"
            >
              <CheckCircle2 size={18} />
              {isLoading ? (
                <Loader2 className="mr-4 h-4 w-4 animate-spin" />
              ) : (
                "Save"
              )}
            </button>

            <p className="text-red-500 text-center my-2.5 md:hidden">{err}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProperty;
