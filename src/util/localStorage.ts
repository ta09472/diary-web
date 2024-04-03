// 사용자 정보를 로컬 저장소에 저장하기
export function setLocalStorage(
  target: string,
  data: unknown
): void {
  localStorage.setItem(target, JSON.stringify(data))
}

export function removeLocalStorage(target: string): void {
  localStorage.removeItem(target)
}

// 저장된 사용자 정보 불러오기
export function getLocalStorage(
  target: string
): unknown | null {
  const data = localStorage.getItem(target)

  if (data) {
    const userInfo = JSON.parse(data)

    return userInfo
  }

  return null
}
