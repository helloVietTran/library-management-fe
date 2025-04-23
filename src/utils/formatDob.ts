import { parse, format } from "date-fns";

const formatDob = (dob: string) => {
    const parsedDate = parse(dob, "d/M/yyyy", new Date());
    return format(parsedDate, "yyyy-MM-dd");
};

export default formatDob;