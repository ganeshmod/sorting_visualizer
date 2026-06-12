/**
 * Quick Sort Implementation
 *
 * Algorithm:
 *   A divide-and-conquer algorithm. Selects a "pivot" element and
 *   partitions the array so that elements smaller than the pivot come before
 *   it and elements greater come after. Recursively applies the same logic
 *   to the subarrays on each side of the pivot.
 *
 * Time Complexity:
 *   - Best:    O(n log n) — pivot always divides array into equal halves
 *   - Average: O(n log n) — random or median pivot
 *   - Worst:   O(n²)      — pivot is always the smallest/largest (sorted input)
 *
 * Space Complexity: O(log n) — recursive call stack depth
 *
 * Stable: NO — swapping elements across partitions changes relative order
 *
 * Note: In practice, Quick Sort is faster than Merge Sort for most inputs
 *       due to better cache performance and lower constant factors.
 */
public class QuickSort {

    /**
     * Recursively sorts subarrays using the Quick Sort algorithm.
     *
     * @param arr  the array to be sorted
     * @param low  starting index of the subarray
     * @param high ending index of the subarray
     */
    public static void quickSort(int[] arr, int low, int high) {
        if (low < high) {
            // Partition the array and get the pivot's final position
            int pivotIndex = partition(arr, low, high);

            // Recursively sort elements before and after partition
            quickSort(arr, low, pivotIndex - 1);
            quickSort(arr, pivotIndex + 1, high);
        }
    }

    /**
     * Partition the array around a pivot element.
     * Elements smaller than pivot go left; larger go right.
     * Uses Lomuto partition scheme with last element as pivot.
     *
     * @param arr  the array to partition
     * @param low  starting index
     * @param high ending index (pivot is arr[high])
     * @return     the final sorted position of the pivot
     */
    private static int partition(int[] arr, int low, int high) {
        int pivot = arr[high]; // Choose the last element as pivot
        int i = low - 1;      // Index of smaller element (partition boundary)

        for (int j = low; j < high; j++) {
            // If current element is smaller than or equal to pivot
            if (arr[j] <= pivot) {
                i++;
                // Swap arr[i] and arr[j]
                int temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
            }
        }

        // Place pivot in its correct position (swap with arr[i+1])
        int temp = arr[i + 1];
        arr[i + 1] = arr[high];
        arr[high] = temp;

        return i + 1; // Return the pivot's final index
    }

    /**
     * Utility method to print array contents.
     *
     * @param arr the array to print
     */
    public static void printArray(int[] arr) {
        System.out.print("[");
        for (int i = 0; i < arr.length; i++) {
            System.out.print(arr[i]);
            if (i < arr.length - 1) System.out.print(", ");
        }
        System.out.println("]");
    }

    public static void main(String[] args) {
        int[] arr = {10, 7, 8, 9, 1, 5, 3};

        System.out.println("=== Quick Sort ===");
        System.out.println("Time Complexity  : Best O(n log n) | Average O(n log n) | Worst O(n²)");
        System.out.println("Space Complexity : O(log n) — recursive call stack");
        System.out.println("Stable           : No");
        System.out.println();
        System.out.print("Before sorting: ");
        printArray(arr);

        quickSort(arr, 0, arr.length - 1);

        System.out.print("After sorting:  ");
        printArray(arr);
    }
}
