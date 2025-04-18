"use client";
import LayoutContainer from "./LayoutContainer";
import bgImage from "@/assets/images/bg-2.jpg";
import Card from "@/components/molecules/Card";
import Image from "next/image";
import {Armchair, Users, Calendar, LayoutGrid} from "lucide-react";
import {useEffect} from "react";
import {useRouter} from "next/navigation";
export default function Home() {
    const router = useRouter();
    const cardData = [
        {
            title: "Row Arrangement",
            description: "Seats are arranged in rows to optimize space.",
            icon: <LayoutGrid size={40} className="text-blue-500" />,
            details:
                "This arrangement is ideal for classrooms, conferences, and large gatherings."
        },
        {
            title: "Group Arrangement",
            description: "Seats are arranged in small groups for discussions.",
            icon: <Users size={40} className="text-green-500" />,
            details:
                "Best for team collaborations, workshops, and brainstorming sessions."
        },
        {
            title: "Scheduled Arrangement",
            description: "Seats are arranged based on scheduled events.",
            icon: <Calendar size={40} className="text-yellow-500" />,
            details:
                "Useful for event-based seating like weddings, conferences, or theater performances."
        },
        {
            title: "Flexible Arrangement",
            description: "Seats can be easily adjusted based on needs.",
            icon: <Armchair size={40} className="text-red-500" />,
            details:
                "Ideal for dynamic workspaces, co-working areas, and interactive sessions."
        }
    ];
    useEffect(() => {
        const isLogin = localStorage.getItem("authToken");
        if (!isLogin) return router.push("/login");
    });
    return (
        <LayoutContainer isNav={false}>
            <main className="flex-1">
                {/* Video Background */}
                <div className="relative w-full h-[650px] flex flex-col justify-center items-center text-white">
                    <video
                        className="absolute top-0 left-0 w-full h-full object-cover"
                        autoPlay
                        loop
                        muted
                        playsInline>
                        <source src="/images/video_BG.mp4" type="video/mp4" />
                        Trình duyệt của bạn không hỗ trợ video.
                    </video>

                    <div className="relative z-10 text-center mt-2">
                        <h2 className="text-4xl font-bold drop-shadow-lg  animate-fadeIn">
                            WELCOME TO SMART SEAT
                        </h2>
                        <p className="text-2xl text-center drop-shadow-md mt-4 animate-fadeIn">
                            Discover a smarter way to manage seating
                            arrangements with <br />
                            our intuitive and dynamic platform.
                        </p>
                    </div>
                </div>
                <div>
                    <p className="text-4xl my-4 mt-8 text-left ml-2 font-medium">
                        Arrangement
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {cardData.map((card, index) => (
                            <Card key={index} title={card.title}>
                                <div className="flex flex-col items-center space-y-3">
                                    {card.icon}
                                    <p className="text-lg font-semibold">
                                        {card.description}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        {card.details}
                                    </p>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
                <div className="text-4xl my-4 mt-8 text-left ml-2 font-medium">
                    We have Services
                </div>
                <div className="relative w-full h-screen overflow-hidden">
                    {/* Background Image */}
                    <div className="absolute inset-0">
                        <Image
                            src={bgImage}
                            alt="Background"
                            layout="fill"
                            objectFit="cover"
                            className="w-full h-full"
                        />
                    </div>

                    {/* Content */}
                    <div className="relative z-10 flex flex-col justify-center h-full px-8 text-white">
                        <h2 className="text-5xl font-bold leading-tight">
                            Find talent your way
                        </h2>
                        <p className="mt-4 text-lg max-w-2xl">
                            Work with the largest network of independent
                            professionals and get things done—from quick
                            turnarounds to big transformations.
                        </p>

                        {/* CTA Buttons */}
                        <div className="mt-6 flex flex-wrap gap-4">
                            <button className="bg-[#108A00] text-white font-semibold px-6 py-3 rounded-md text-lg shadow-lg hover:bg-green">
                                Post a job and hire a pro →
                            </button>
                            <button className="bg-[#108A00] text-white font-semibold px-6 py-3 rounded-md text-lg shadow-lg hover:bg-green">
                                Browse and buy projects →
                            </button>
                            <button className="bg-[#108A00] text-white font-semibold px-6 py-3 rounded-md text-lg shadow-lg hover:bg-green">
                                Get advice from an industry expert →
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </LayoutContainer>
    );
}
