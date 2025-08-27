
interface PropsPage {
    params : {
        slug : string;
    }
}

export default function DetailedCategoryPage ({params} : PropsPage) {
    const {slug} = params;

    return (
        <div className="flex min-h-screen">
            <h2>Category Details</h2>
        </div>
    )
}