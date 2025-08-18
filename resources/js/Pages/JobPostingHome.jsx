import DefaultProfile from "../../images/defaultProfile.jpg";
import MainLogo from "../../images/mainLogo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { DateRangePicker } from "@/Components/date-range-picker";
import Checkbox from "@/Components/Checkbox";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
    SelectGroup,
    SelectLabel,
} from "@/components/ui/select";
import { useState } from "react";

import { MultiSelect } from "@/Components/MultiSelect";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

export default function JobPostingHome() {
    const [selectedValues, setSelectedValues] = useState([]);

    // Sample data - replace with your actual options
    const frameworks = [
        {
            value: "next",
            label: "Next.js",
        },
        {
            value: "react",
            label: "React",
        },
        {
            value: "angular",
            label: "Angular",
        },
        {
            value: "vue",
            label: "Vue.js",
        },
        {
            value: "svelte",
            label: "Svelte",
        },
        {
            value: "remix",
            label: "Remix",
        },
        {
            value: "astro",
            label: "Astro",
        },
        {
            value: "nuxt",
            label: "Nuxt.js",
        },
    ];

    const jobTypes = {
        full_time: "Full Time",
        part_time: "Part Time",
        contract: "Contract",
        temporary: "Temporary",
    };

    const workTypes = {
        onsite: "On-site",
        remote: "Remote",
        hybrid: "Hybrid",
    };
    return (
        <div className="h-screen min-h-screen max-h-screen flex flex-col">
            <nav className="flex items-center justify-between h-20 border-b border-black/10 px-20 bg-white">
                <section>
                    <img src={MainLogo} alt="main logo" className="h-20" />
                </section>
                <section>
                    <ul className="flex items-center justify-between gap-14 text-gray-600 text-lg">
                        <li>Find Jobs</li>
                        <li>Find Talent</li>
                        <li>Find Companies</li>
                    </ul>
                </section>
                <section>
                    <img
                        src={DefaultProfile}
                        alt="default profile"
                        className="h-10 rounded-full"
                    />
                </section>
            </nav>

            <div className="flex gap-5 flex-1 px-20 py-10">
                <div className="rounded-lg border-2 border-black/10 w-96 h-full">
                    <section className="p-5 flex items-center justify-between font-bold text-lg border-b border-black/10">
                        <p>Filter</p>
                        <p className="text-red-500">Clear All</p>
                    </section>

                    <section className="mx-8 border-b border-black/10 py-5 space-y-2">
                        <p className="font-bold text-lg">Post Date</p>
                        <DateRangePicker />
                    </section>

                    <section className="mx-8 border-b border-black/10 py-5 space-y-2">
                        <p className="font-bold text-lg">Job Type</p>
                        <div className="grid w-full grid-cols-2 gap-3">
                            {Object.entries(jobTypes).map(([key, label]) => (
                                <label
                                    key={key}
                                    className="flex items-center gap-2"
                                >
                                    <Checkbox value={key} />
                                    {label}
                                </label>
                            ))}
                        </div>
                    </section>

                    <section className="mx-8 border-b border-black/10 py-5 space-y-2">
                        <p className="font-bold text-lg">Salary Range</p>
                        <Select>
                            <SelectTrigger>
                                <SelectValue placeholder="Select a salary range" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Salary Ranges</SelectLabel>
                                    <SelectItem value="30000-40000">
                                        $30,000 - $40,000
                                    </SelectItem>
                                    <SelectItem value="40000-50000">
                                        $40,000 - $50,000
                                    </SelectItem>
                                    <SelectItem value="50000-60000">
                                        $50,000 - $60,000
                                    </SelectItem>
                                    <SelectItem value="60000-70000">
                                        $60,000 - $70,000
                                    </SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </section>

                    <section className="mx-8 border-b border-black/10 py-5 space-y-2">
                        <p className="font-bold text-lg">Work Type</p>
                        <div className="grid w-full grid-cols-2 gap-3">
                            {Object.entries(workTypes).map(([key, label]) => (
                                <label
                                    key={key}
                                    className="flex items-center gap-2"
                                >
                                    <Checkbox value={key} />
                                    {label}
                                </label>
                            ))}
                        </div>
                    </section>

                    <Card className="w-full max-w-2xl mx-auto">
                        <CardHeader>
                            <CardTitle>Multi-Select Component</CardTitle>
                            <CardDescription>
                                Select multiple frameworks from the dropdown
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                    Select Frameworks
                                </label>
                                <MultiSelect
                                    options={frameworks}
                                    onValueChange={setSelectedValues}
                                    defaultValue={selectedValues}
                                    placeholder="Select frameworks"
                                    maxCount={3}
                                />
                            </div>

                            {/* Display selected values */}
                            <div className="space-y-2">
                                <h3 className="text-sm font-medium">
                                    Selected Values:
                                </h3>
                                <pre className="bg-muted p-3 rounded-md text-sm">
                                    {JSON.stringify(selectedValues, null, 2)}
                                </pre>
                            </div>
                        </CardContent>
                    </Card>
                </div>
                <div className="flex-1">
                    <div className="h-16 border-2 border-black/10 rounded-lg flex items-center px-5 gap-3">
                        <FontAwesomeIcon
                            icon={faMagnifyingGlass}
                            className=" text-black/40 text-2xl"
                        />
                        <input
                            type="text"
                            className="outline-none border-none flex-1"
                            placeholder="Search Job Title or Keywords"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
