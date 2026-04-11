export default function AdminLoading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] w-full">
      <div className="relative flex justify-center items-center">
        {/* Outer Ring */}
        <div className="absolute animate-spin rounded-full h-16 w-16 border-4 border-[#8cb400]/20 border-t-[#8cb400]"></div>
        {/* Inner Ring */}
        <div className="absolute animate-spin rounded-full h-10 w-10 border-4 border-[#8cb400]/20 border-b-[#8cb400] direction-reverse"></div>
        {/* Center Dot */}
        <div className="h-2 w-2 bg-[#8cb400] rounded-full animate-ping"></div>
      </div>
      <p className="mt-6 text-[#8cb400] font-medium animate-pulse text-sm">
        Memuat Data...
      </p>
    </div>
  );
}
