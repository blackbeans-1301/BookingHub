import * as React from "react";
import Navigation from "../../components/Layouts/Navigation";
import Main from "../../components/Layouts/Main";
import Header from "../../components/Layouts/Header";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import SearchIcon from "@material-ui/icons/Search";
import RotateLeftSharpIcon from "@material-ui/icons/RotateLeftSharp";
import RemoveCircleOutlineSharpIcon from "@material-ui/icons/RemoveCircleOutlineSharp";
import MoreVertSharpIcon from "@material-ui/icons/MoreVertSharp";

const AdminPage = () => {
  return (
    <div className="flex">
      <Navigation />
      <div className="flex-1 h-screen">
        <Header />

        <div className="m-4 bg-white w-screen z-10 md:w-auto w-full">
          <div className="flex mt-3">
            <div className="relative flex items-center text-gray-400 focus-within:text-gray-600 w-5/6">
              <SearchIcon className="w-5 h-5 absolute ml-3 pointer-events-none" />
              <input
                className="md:w-full pr-3 pl-10 py-2 font-semibold placeholder-gray-500 text-colorText rounded-2xl boder-none ring-2 ring-gray-300 focus:ring-primary-500 focus: ring-2"
                type="text"
                placeholder="Search..."
              />
            </div>

            <div className="w-1/6">
              <button className="w-3/4 h-full px-2 rounded-full bg-white text-colorText flex items-center justify-center ml-2 border-2 border-light-primary hover:bg-primary hover:text-white hover:shadow-md hover:shadow-gray-200">
                <SearchIcon />
                <span>Search</span>
              </button>
            </div>
          </div>

          <h1 className="font-bold text-2xl mb-3 text-colorText mt-3">
            List of stays
          </h1>

          <div class="container mx-auto px-4 sm:px-8">
            <div class="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
              <div class="inline-block min-w-full shadow-md rounded-lg overflow-hidden">
                <table class="min-w-full leading-normal">
                  <thead>
                    <tr>
                      <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        ID
                      </th>
                      <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Hotel name
                      </th>
                      <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Hotel owner
                      </th>
                      <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Room
                      </th>
                      <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Address
                      </th>
                      <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Price
                      </th>
                      <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Posted date
                      </th>
                      <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Status
                      </th>
                      <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Actions
                      </th>
                      <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100"></th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr>
                      {/* column 1 */}
                      <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p class="text-gray-900 whitespace-no-wrap">12345</p>
                      </td>

                      {/* column 2 */}
                      <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p class="text-gray-900 whitespace-no-wrap">
                          Peridot Grand Luxury Boutique Hotel
                        </p>
                      </td>

                      {/* column 3 */}
                      <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p class="text-gray-900 whitespace-no-wrap">Florence</p>
                      </td>

                      {/* column 4 */}
                      <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p class="text-gray-900 whitespace-no-wrap">P.123</p>
                      </td>

                      {/* column 5 */}
                      <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p class="text-gray-900 whitespace-no-wrap">
                          Hoan Kiem, Hanoi, Vietnam
                        </p>
                      </td>

                      {/* column 6 */}
                      <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p class="text-gray-900 whitespace-no-wrap">$20,000</p>
                        <p class="text-gray-600 whitespace-no-wrap">USD</p>
                      </td>

                      {/* column 7 */}
                      <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p class="text-gray-900 whitespace-no-wrap">
                          Sept 28, 2019
                        </p>
                      </td>

                      {/* column 8 */}
                      <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <span class="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                          <span
                            aria-hidden
                            class="absolute inset-0 bg-green-200 opacity-50 rounded-full"
                          ></span>
                          <span class="relative">Verified</span>
                        </span>
                      </td>

                      {/* column 9 */}
                      <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm text-right">
                        <div className="flex">
                          <button
                            type="button"
                            class="inline-block mx-px text-green-300 hover:text-green-500"
                          >
                            <CheckCircleOutlineIcon />
                          </button>

                          <button
                            type="button"
                            class="inline-block mx-px text-yellow-300 hover:text-yellow-500"
                          >
                            <RotateLeftSharpIcon />
                          </button>

                          <button
                            type="button"
                            class="inline-block mx-px text-rose-300 hover:text-rose-500"
                          >
                            <RemoveCircleOutlineSharpIcon />
                          </button>

                          <button
                            type="button"
                            class="inline-block mx-px text-gray-400 hover:text-gray-600"
                          >
                            <MoreVertSharpIcon />
                          </button>
                        </div>
                      </td>
                    </tr>

                    <tr>
                      {/* column 1 */}
                      <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p class="text-gray-900 whitespace-no-wrap">12345</p>
                      </td>

                      {/* column 2 */}
                      <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p class="text-gray-900 whitespace-no-wrap">
                          Peridot Grand Luxury Boutique Hotel
                        </p>
                      </td>

                      {/* column 3 */}
                      <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p class="text-gray-900 whitespace-no-wrap">Florence</p>
                      </td>

                      {/* column 4 */}
                      <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p class="text-gray-900 whitespace-no-wrap">P.123</p>
                      </td>

                      {/* column 5 */}
                      <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p class="text-gray-900 whitespace-no-wrap">
                          Hoan Kiem, Hanoi, Vietnam
                        </p>
                      </td>

                      {/* column 6 */}
                      <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p class="text-gray-900 whitespace-no-wrap">$20,000</p>
                        <p class="text-gray-600 whitespace-no-wrap">USD</p>
                      </td>

                      {/* column 7 */}
                      <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p class="text-gray-900 whitespace-no-wrap">
                          Sept 28, 2019
                        </p>
                      </td>

                      {/* column 8 */}
                      <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <span class="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                          <span
                            aria-hidden
                            class="absolute inset-0 bg-green-200 opacity-50 rounded-full"
                          ></span>
                          <span class="relative">Verified</span>
                        </span>
                      </td>

                      {/* column 9 */}
                      <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm text-right">
                        <div className="flex">
                          <button
                            type="button"
                            class="inline-block mx-px text-green-300 hover:text-green-500"
                          >
                            <CheckCircleOutlineIcon />
                          </button>

                          <button
                            type="button"
                            class="inline-block mx-px text-yellow-300 hover:text-yellow-500"
                          >
                            <RotateLeftSharpIcon />
                          </button>

                          <button
                            type="button"
                            class="inline-block mx-px text-rose-300 hover:text-rose-500"
                          >
                            <RemoveCircleOutlineSharpIcon />
                          </button>

                          <button
                            type="button"
                            class="inline-block mx-px text-gray-400 hover:text-gray-600"
                          >
                            <MoreVertSharpIcon />
                          </button>
                        </div>
                      </td>
                    </tr>

                    <tr>
                      {/* column 1 */}
                      <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p class="text-gray-900 whitespace-no-wrap">12345</p>
                      </td>

                      {/* column 2 */}
                      <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p class="text-gray-900 whitespace-no-wrap">
                          Peridot Grand Luxury Boutique Hotel
                        </p>
                      </td>

                      {/* column 3 */}
                      <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p class="text-gray-900 whitespace-no-wrap">Florence</p>
                      </td>

                      {/* column 4 */}
                      <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p class="text-gray-900 whitespace-no-wrap">P.123</p>
                      </td>

                      {/* column 5 */}
                      <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p class="text-gray-900 whitespace-no-wrap">
                          Hoan Kiem, Hanoi, Vietnam
                        </p>
                      </td>

                      {/* column 6 */}
                      <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p class="text-gray-900 whitespace-no-wrap">$20,000</p>
                        <p class="text-gray-600 whitespace-no-wrap">USD</p>
                      </td>

                      {/* column 7 */}
                      <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p class="text-gray-900 whitespace-no-wrap">
                          Sept 28, 2019
                        </p>
                      </td>

                      {/* column 8 */}
                      <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <span class="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                          <span
                            aria-hidden
                            class="absolute inset-0 bg-green-200 opacity-50 rounded-full"
                          ></span>
                          <span class="relative">Verified</span>
                        </span>
                      </td>

                      {/* column 9 */}
                      <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm text-right">
                        <div className="flex">
                          <button
                            type="button"
                            class="inline-block mx-px text-green-300 hover:text-green-500"
                          >
                            <CheckCircleOutlineIcon />
                          </button>

                          <button
                            type="button"
                            class="inline-block mx-px text-yellow-300 hover:text-yellow-500"
                          >
                            <RotateLeftSharpIcon />
                          </button>

                          <button
                            type="button"
                            class="inline-block mx-px text-rose-300 hover:text-rose-500"
                          >
                            <RemoveCircleOutlineSharpIcon />
                          </button>

                          <button
                            type="button"
                            class="inline-block mx-px text-gray-400 hover:text-gray-600"
                          >
                            <MoreVertSharpIcon />
                          </button>
                        </div>
                      </td>
                    </tr>

                    <tr>
                      {/* column 1 */}
                      <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p class="text-gray-900 whitespace-no-wrap">12345</p>
                      </td>

                      {/* column 2 */}
                      <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p class="text-gray-900 whitespace-no-wrap">
                          Peridot Grand Luxury Boutique Hotel
                        </p>
                      </td>

                      {/* column 3 */}
                      <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p class="text-gray-900 whitespace-no-wrap">Florence</p>
                      </td>

                      {/* column 4 */}
                      <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p class="text-gray-900 whitespace-no-wrap">P.123</p>
                      </td>

                      {/* column 5 */}
                      <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p class="text-gray-900 whitespace-no-wrap">
                          Hoan Kiem, Hanoi, Vietnam
                        </p>
                      </td>

                      {/* column 6 */}
                      <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p class="text-gray-900 whitespace-no-wrap">$20,000</p>
                        <p class="text-gray-600 whitespace-no-wrap">USD</p>
                      </td>

                      {/* column 7 */}
                      <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p class="text-gray-900 whitespace-no-wrap">
                          Sept 28, 2019
                        </p>
                      </td>

                      {/* column 8 */}
                      <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <span class="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                          <span
                            aria-hidden
                            class="absolute inset-0 bg-green-200 opacity-50 rounded-full"
                          ></span>
                          <span class="relative">Verified</span>
                        </span>
                      </td>

                      {/* column 9 */}
                      <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm text-right">
                        <div className="flex">
                          <button
                            type="button"
                            class="inline-block mx-px text-green-300 hover:text-green-500"
                          >
                            <CheckCircleOutlineIcon />
                          </button>

                          <button
                            type="button"
                            class="inline-block mx-px text-yellow-300 hover:text-yellow-500"
                          >
                            <RotateLeftSharpIcon />
                          </button>

                          <button
                            type="button"
                            class="inline-block mx-px text-rose-300 hover:text-rose-500"
                          >
                            <RemoveCircleOutlineSharpIcon />
                          </button>

                          <button
                            type="button"
                            class="inline-block mx-px text-gray-400 hover:text-gray-600"
                          >
                            <MoreVertSharpIcon />
                          </button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
