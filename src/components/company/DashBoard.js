import { Link } from "react-router-dom"
export function DashBoard() {
   return (
      <div>
         <h1>DashBoard</h1>
         <Link to='/quotation-list'>quotations sent</Link>
      </div>
   )
}