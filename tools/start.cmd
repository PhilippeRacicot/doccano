python app/manage.py wait_for_db
python app/manage.py migrate
python app/manage.py create_admin --noinput --username="admin" --email="admin@admin.com" --password="admin"
python app/manage.py runserver