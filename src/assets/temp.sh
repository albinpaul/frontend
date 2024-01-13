for file in $(ls cards)
do 
    new_file=$file
    new_file=$(echo $new_file| sed 's/^10/ten/' )
    new_file=$(echo $new_file| sed 's/^2/two/'  )
    new_file=$(echo $new_file| sed 's/^3/three/' )
    new_file=$(echo $new_file| sed 's/^4/four/' )
    new_file=$(echo $new_file| sed 's/^5/five/' )
    new_file=$(echo $new_file| sed 's/^6/six/' )
    new_file=$(echo $new_file| sed 's/^7/seven/')
    new_file=$(echo $new_file| sed 's/^8/eight/' )
    new_file=$(echo $new_file| sed 's/^9/nine/')

    cp cards/$file new_cards/$new_file
done