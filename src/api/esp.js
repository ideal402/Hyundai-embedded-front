export async function checkEspStatus() {
    try {
      const res = await fetch("/api/esp32");
      const data = await res.json();
      return data.connected; // true 또는 false
    } catch (err) {
      console.error("ESP 상태 확인 실패:", err);
      return false;
    }
  }
  