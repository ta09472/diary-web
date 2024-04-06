import { Diary } from '../schema/Diary'

export default function parseHistoryData(
  dataString: string | undefined
): Diary[] {
  if (!dataString) return []
  try {
    // JSON 문자열을 안전하게 파싱합니다.
    const parsedData = JSON.parse(dataString ?? '{}')
    // history가 배열인지 확인하고, 맞다면 그 값을 반환합니다.
    if (Array.isArray(parsedData.history)) {
      return parsedData.history
    } else {
      return [] // 예상한 형식이 아니면 빈 배열을 반환합니다.
    }
  } catch (error) {
    return [] // 파싱 중 오류가 발생하면 빈 배열을 반환합니다.
  }
}
