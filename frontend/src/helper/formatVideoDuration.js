function  formatDuration(videoDuration) {
    
    // Option 1: Minutes and seconds (including seconds)
    const minutes = Math.floor(videoDuration / 60);
    const seconds = Math.round(videoDuration % 60);
    // console.log(`Video duration: ${minutes} minutes and ${seconds} seconds`);  // Output: Video duration: 0 minutes and 23 seconds
    
    // Option 2: Minutes only (without seconds)
    const formattedDuration = `${minutes}:${seconds}`
    // console.log(formattedDuration)
    return formattedDuration
};  // Output: Video duration: 0 minutes

export default formatDuration