import { NextPage } from "next"

const Write: NextPage = () => {
  return (
  <div className="px-4 py-10">
    <textarea
      className="mt-1 shadow-sm w-full focus:ring-orange-500 rounded-md border-gray-300  border px-3 py-2 focus:border-orange-500 focus:outline-none"
      rows={4}
      placeholder="Ask a Question!"
    />
    <button className="mt-2 w-full bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 focus:outline-none ">
      Reply
    </button>
  </div>)
}
export default Write