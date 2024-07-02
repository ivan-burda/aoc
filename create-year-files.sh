#!/bin/bash

# Get the current year
current_year=$(date +%Y)

# Loop through days 1 to 24
for day in {1..24}; do
    # Format day with two digits (preceding zero)
    formatted_day=$(printf "%02d" "$day")

    # Create subfolder for the day
    mkdir -p "$current_year/$formatted_day/__tests__"

    # Create __tests__ folder and test file with content
    test_content="describe('AOC-$current_year-$formatted_day', () => {});"
    echo "$test_content" > "$current_year/$formatted_day/__tests__/$current_year-$formatted_day.test.ts"

    # Create files at the same level for each day
    touch "$current_year/$formatted_day/$current_year-$formatted_day.ts"
    touch "$current_year/$formatted_day/$current_year-$formatted_day.txt"
done
