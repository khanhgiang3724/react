import React from 'react'
import { Category } from '../../../interfaces/product'
import { Link } from 'react-router-dom'
type Props = {
  categorys: Category[],
  onDelete : (id:number)=>void
}
const ListCategory = ({ categorys,onDelete }: Props) => {
  return (
    <div className='w-auto '>
      
      <div className="overflow-x-auto">
      <Link to="/admin/categoryadd" 
        className="inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700">
        Add Category
      </Link>
        <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
          <thead className="ltr:text-left rtl:text-right">
            <tr>
              <th className=" px-4 py-2 font-medium text-gray-900">STT</th>
              <th className=" px-4 py-2 font-medium text-gray-900">Tên danh mục</th>
              <th className=" px-4 py-2 font-medium text-gray-900">Số lượng</th>
              <th className=" px-4 py-2 font-medium text-gray-900">Ảnh</th>
              <th className="px-4 py-2"></th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {categorys.map(item => (
              <tr>
                <td className=" px-4 py-2 font-medium text-gray-900">{item.id}</td>
                <td className=" px-4 py-2 text-gray-700">{item.name}</td>
                <td className=" px-4 py-2 text-gray-700">{item.quantity}</td>
                <td className=" px-4 py-2 text-gray-700">
                  <img className='h-60' src={item.images} alt="" />
                </td>
                <td className="whitespace-nowrap px-4 py-2">
                  <Link
                    to={`/admin/category/edit/${item.id}`}
                    className="inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700"
                  >
                    View
                  </Link>
                  <button
                    onClick={() => onDelete(Number(item.id))}
                    className="inline-block rounded bg-red-600 px-4 py-2 text-xs font-medium text-white hover:bg-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ListCategory
