export default function Search(props) {
    const inputFields = [
        {
            placeholder: "Search by name",
            onChange: (event) => props.setNameQuery(event.target.value),
            value: !props.nameQuery ? "" : props.nameQuery,
        },
        {
            placeholder: "Search by tag",
            onChange: (event) => props.setTagQuery(event.target.value),
            value: !props.tagQuery ? "" : props.tagQuery,
        },
    ]

    return (
        <div className="z-2 sticky top-0 left-0 right-0 z-50 self-center bg-white px-4">
            {inputFields.map((input, i) => {
                return (
                    <input
                        key={i}
                        type="search"
                        placeholder={input.placeholder}
                        onChange={input.onChange}
                        value={input.value}
                        className="z-50 max-h-[50px] min-h-[50px] min-w-full border-b-2 bg-white px-2 pt-1 text-lg outline-0 focus-visible:border-black"
                    />
                )
            })}
        </div>
    )
}
