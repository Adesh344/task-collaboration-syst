const Loader = ({ fullScreen = false }) => (
  <div className={`flex items-center justify-center ${fullScreen ? "min-h-screen" : "py-12"}`}>
    <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
  </div>
);

export default Loader;