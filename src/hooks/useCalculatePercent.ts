import { useMemo } from 'react'

function useCalculatePercent(currentData: number, oldData: number) {
  const percent = useMemo(() => ((currentData - oldData) / oldData) * 100, [oldData, currentData])

  const isIncrease = useMemo(() => currentData > oldData, [oldData, currentData])

  return { percent: Math.abs(percent).toFixed(2), isIncrease }
}

export default useCalculatePercent
