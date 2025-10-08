# Q1

class Solution:
    def twoSum(self, numbers: List[int], target: int) -> List[int]:
            low = 0
            high = len(numbers) - 1
            
            while low < high:
                result = numbers[low] + numbers[high]
                if result > target:
                    high -= 1
                elif result < target:
                    low += 1
                else:
                    return [low + 1, high + 1]

# Q2

class Solution:
    def productExceptSelf(self, nums: List[int]) -> List[int]:
        from typing import List
        n = len(nums)
        prod = [1] * n

        left = 1
        for i in range(n):
            prod[i] = left
            left = left * nums[i]

        right = 1
        for i in range(n - 1, -1, -1):
            prod[i] = prod[i] * right
            right = right * nums[i]

        return prod
    

# Q3

class Solution:
    def sortColors(self, nums):
        counts = [0, 0, 0]

        for x in nums: 
            counts[x] += 1

        i = 0                      
        for color in range(3):
            for _ in range(counts[color]):
                nums[i] = color
                i += 1
