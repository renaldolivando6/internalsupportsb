import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Head } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";

export default function RefreshNpwp() {
    const [message, setMessage] = useState<string | null>(null);
    const [status, setStatus] = useState<string | null>(null);
    const [isDisabled, setIsDisabled] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        const lastClicked = localStorage.getItem("refresh_npwp_last_clicked");
        if (lastClicked) {
            const timeElapsed = Date.now() - parseInt(lastClicked, 10);
            if (timeElapsed < 120000) {
                setIsDisabled(true);
                setTimeout(() => {
                    setIsDisabled(false);
                }, 120000 - timeElapsed);
            }
        }
    }, []);

    useEffect(() => {
        if (isDisabled && canvasRef.current) {
            startPizzaSpinner(canvasRef.current);
        }
    }, [isDisabled]);

    const handleRefresh = async () => {
        setIsDisabled(true);
        setIsLoading(true);
        localStorage.setItem("refresh_npwp_last_clicked", Date.now().toString());

        try {
            const response = await axios.post("/job/tax/refresh-npwp");
            setStatus(response.data.status);
            setMessage(response.data.message);
        } catch (error) {
            setStatus("error");
            setMessage("Something went wrong. Please try again.");
        }

        setTimeout(() => {
            setIsDisabled(false);
        }, 120000);

        setTimeout(() => {
            setIsLoading(false);
        }, 2000);
    };

    return (
        <AppLayout>
            <Head title="Refresh NPWP" />

            <div className="p-8 flex flex-col items-center gap-6">
                <h1 className="text-2xl font-bold text-gray-800">Refresh NPWP Pelanggan</h1>
                <p className="text-gray-600">Klik tombol di bawah untuk menjalankan proses!</p>

                {isDisabled ? (
                    <div className="flex flex-col items-center">
                        <div className="relative w-48 h-48 flex items-center justify-center">
                            <canvas ref={canvasRef} id="pizza" width="100" height="100" />
                        </div>
                        <p className="mt-2 text-gray-600 text-sm">Wait, the process is still running...</p>
                    </div>
                ) : (
                    <button
                        onClick={handleRefresh}
                        className="relative flex items-center justify-center w-48 h-48 rounded-full text-white text-lg font-bold transition-all shadow-lg bg-gradient-to-r from-yellow-400 to-orange-500 hover:shadow-xl hover:scale-105 active:scale-95"
                        style={{ transform: "perspective(500px) rotateX(10deg)" }}
                    >
                        <span className="drop-shadow-md">Click to Refresh</span>
                    </button>
                )}

                {message && (
                    <p
                        className={`text-lg px-4 py-2 rounded-lg ${
                            status === "success"
                                ? "text-green-700 bg-green-100 border border-green-400"
                                : status === "warning"
                                ? "text-orange-700 bg-orange-100 border border-orange-400"
                                : "text-red-700 bg-red-100 border border-red-400"
                        }`}
                    >
                        {message}
                    </p>
                )}
            </div>
        </AppLayout>
    );
}









//efek loading Pizza

function startPizzaSpinner(canvas: HTMLCanvasElement) {
    let toRadians = (deg: number) => (deg * Math.PI) / 180;

    class Pizza {
        canvas: HTMLCanvasElement;
        ctx: CanvasRenderingContext2D;
        sliceCount = 6;
        sliceSize = 40;
        width: number;
        height: number;
        center: number;
        sliceDegree: number;
        sliceRadians: number;
        progress: number;
        cooldown: number;

        constructor(canvas: HTMLCanvasElement) {
            this.canvas = canvas;
            this.ctx = this.canvas.getContext("2d")!;
            this.width = this.height = this.canvas.height = this.canvas.width = this.sliceSize * 2 + 20;
            this.center = this.height / 2 | 0;
            this.sliceDegree = 360 / this.sliceCount;
            this.sliceRadians = toRadians(this.sliceDegree);
            this.progress = 0;
            this.cooldown = 10;
        }

        update() {
            let ctx = this.ctx;
            ctx.clearRect(0, 0, this.width, this.height);

            if (--this.cooldown < 0) this.progress += this.sliceRadians * 0.01 + this.progress * 0.07;

            ctx.save();
            ctx.translate(this.center, this.center);

            for (let i = this.sliceCount - 1; i > 0; i--) {
                let rad;
                if (i === this.sliceCount - 1) {
                    rad = this.sliceRadians * i + this.progress;
                } else {
                    rad = this.sliceRadians * i;
                }

                // Border
                ctx.beginPath();
                ctx.lineCap = 'butt';
                ctx.lineWidth = 8;
                ctx.arc(0, 0, this.sliceSize, rad, rad + this.sliceRadians);
                ctx.strokeStyle = "#F57F17";
                ctx.stroke();

                // Slice
                ctx.fillStyle = "#FBC02D";
                ctx.beginPath();
                ctx.moveTo(0, 0);
                ctx.arc(0, 0, this.sliceSize, rad, rad + this.sliceRadians);
                ctx.lineTo(0, 0);
                ctx.closePath();
                ctx.fill();
                ctx.lineWidth = 0.3;
                ctx.stroke();

                // Just one small pepperoni per slice
                let x = this.sliceSize * 0.65 * Math.cos(rad + this.sliceRadians / 2);
                let y = this.sliceSize * 0.65 * Math.sin(rad + this.sliceRadians / 2);
                ctx.beginPath();
                ctx.arc(x, y, this.sliceSize * 0.08, 0, 2 * Math.PI);
                ctx.fillStyle = "#D84315";
                ctx.fill();
            }

            ctx.restore();

            if (this.progress > this.sliceRadians) {
                ctx.translate(this.center, this.center);
                ctx.rotate(-this.sliceDegree * Math.PI / 180);
                ctx.translate(-this.center, -this.center);
                this.progress = 0;
                this.cooldown = 20;
            }
        }
    }

    let pizza = new Pizza(canvas);
    (function update() {
        requestAnimationFrame(update);
        pizza.update();
    })();
}
