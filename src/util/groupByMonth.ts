// @ts-nocheck
import { Diary } from '../schema/Diary'

export function groupByMonth(entries: Diary[]): {
  [date: string]: Diary[]
} {
  if (!entries) return []
  return entries.reduce((acc, entry) => {
    // createdAt에서 년도와 월을 추출하여 "년_월" 형식으로 만듦

    console.log(acc)
    const match = entry.createdAt.match(
      /\d{4}년\s+(\d{2})월/
    )
    const yearMonth = `${match[0].replace('년 ', '_').replace('월', '')}` // "년 "을 "_"로, "월"을 제거하여 형식 맞춤

    // 해당 "년_월"이 이미 acc에 존재하면 해당 배열에 entry 추가, 그렇지 않으면 새 배열 생성
    if (!acc[yearMonth]) {
      acc[yearMonth] = [entry]
    } else {
      acc[yearMonth].push(entry)
    }

    return acc
  }, {})
}

export function separateByObject(groupedEntries): {
  [date: string]: Diary[]
} {
  const currentYear = new Date().getFullYear().toString() // 현재 연도를 문자열로 변환
  const transformed = Object.keys(groupedEntries).reduce(
    (acc, key) => {
      // key 분해 ("년_월" 형식)
      const [year, month] = key.split('_')

      // 현재 연도와 같은 경우 "x월"로, 다른 경우 "xxxx년_x월"로 키 변형
      const newKey =
        year === currentYear
          ? `${month}월`
          : `${year}년_${month}월`

      // 변형된 키를 사용하여 새 객체 구성
      acc[newKey] = groupedEntries[key]

      return acc
    },
    {}
  )

  return transformed
}

export function filterData(
  data: { [date: string]: Diary[] },
  input: string
): { [date: string]: Diary[] } {
  return Object.entries(data).reduce(
    (acc, [key, value]) => {
      // inputData를 포함하는 항목만 필터링
      const filteredEntries = value.filter(
        (entry) =>
          entry.content.includes(input) ||
          entry.response!.includes(input) ||
          entry.createdAt.toString().includes(input)
      )

      if (filteredEntries.length > 0) {
        acc[key] = filteredEntries // 필터링된 항목이 있으면 결과 객체에 추가
      }

      return acc
    },
    {}
  )
}
