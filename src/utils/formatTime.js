/** 한국 시간으로 변환하여  YYYY-MM-dd HH:mm:ss 형태로 반환해 주는 함수
 * @param {date} date
 * @returns YYYY-MM-dd HH:mm:ss
 */
export const getLocaleTime = (date) => {
  const localTime = new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false, // 24시간 형식으로
  }).format(date);

  return localTime
    .replace(/\./g, "-")
    .replace(/-\s/g, "-")
    .replace(/-(\d{2}):/, " $1:")
    .replace(/\s{2,}/g, " ");
};
