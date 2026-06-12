/**
 * Merge Sort Implementation
 *
 * Algorithm:
 *   A divide-and-conquer algorithm. Recursively divides the array into
 *   two halves, sorts each half, then merges the sorted halves back together.
 *   The merge step is the key — it combines two sorted arrays into one.
 *
 * Time Complexity:
 *   - Best:    O(n log n) — always divides and merges regardless of input
 *   - Average: O(n log n)
 *   - Worst:   O(n log n) — consistent performance
 *
 * Space Complexity: O(n) — requires auxiliary array for merging
 *
 * Stable: YES — equal elements maintain their relative order during merge
 */
public class MergeSort {

    /**
     * Recursively splits the array and merges sorted halves.
     *
     * @param arr  the array to be sorted
     * @param left  starting index of the subarray
     * @param right ending index of the subarray
     */
    public static void mergeSort(int[] arr, int left, int right) {
        if (left < right) {
            // Find the middle point to divide array into two halves
            int mid = (left + right) / 2;

            // Recursively sort each half
            mergeSort(arr, left, mid);
            mergeSort(arr, mid + 1, right);

            // Merge the sorted halves
            merge(arr, left, mid, right);
        }
    }

    /**
     * Merges two sorted subarrays: arr[left..mid] and arr[mid+1..right].
     *
     * @param arr   the array containing both subarrays
     * @param left  starting index of the left subarray
     * @param mid   ending index of the left subarray
     * @param right ending index of the right subarray
     */
    private static void merge(int[] arr, int left, int mid, int right) {
        // Calculate sizes of two subarrays
        int n1 = mid - left + 1;
        int n2 = right - mid;

        // Create temporary arrays
        int[] leftArr = new int[n1];
        int[] rightArr = new int[n2];

        // Copy data to temp arrays
        for (int i = 0; i < n1; i++)
            leftArr[i] = arr[left + i];
        for (int j = 0; j < n2; j++)
            rightArr[j] = arr[mid + 1 + j];

        // Merge the temp arrays back into arr[left..right]
        int i = 0, j = 0;
        int k = left; // Initial index of merged subarray

        while (i < n1 && j < n2) {
            // Pick the smaller of the two elements
            if (leftArr[i] <= rightArr[j]) {
                arr[k] = leftArr[i];
                i++;
            } else {
                arr[k] = rightArr[j];
                j++;
            }
            k++;
        }

        // Copy remaining elements of leftArr (if any)
        while (i < n1) {
            arr[k] = leftArr[i];
            i++;
            k++;
        }

        // Copy remaining elements of rightArr (if any)
        while (j < n2) {
            arr[k] = rightArr[j];
            j++;
            k++;
        }
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
        int[] arr = {38, 27, 43, 3, 9, 82, 10};

        System.out.println("=== Merge Sort ===");
        System.out.println("Time Complexity  : Best O(n log n) | Average O(n log n) | Worst O(n log n)");
        System.out.println("Space Complexity : O(n) — requires auxiliary array");
        System.out.println("Stable           : Yes");
        System.out.println();
        System.out.print("Before sorting: ");
        printArray(arr);

        mergeSort(arr, 0, arr.length - 1);

        System.out.print("After sorting:  ");
        printArray(arr);
    }
}
