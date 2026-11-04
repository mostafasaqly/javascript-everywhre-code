import { Link } from "react-router";
import EmptyState from "../components/ui/EmptyState";

function NotFoundPage() {
    return (<EmptyState 
        title="Page Not Found" 
        message="The page you are looking for does not exist." 
        action={<Link to="/">Go back to all tasks</Link>}
        />)
}
export default NotFoundPage;