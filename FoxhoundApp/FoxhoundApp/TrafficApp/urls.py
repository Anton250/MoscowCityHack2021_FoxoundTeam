from django.conf.urls import url, include
from rest_auth.views import (
    LoginView,
    LogoutView,
    UserDetailsView
)
from rest_framework import routers
from FoxhoundApp.TrafficApp.views import ItemsView, HeatMapView

rest_auth_urls = [
    url(r'^login/$', LoginView.as_view(), name='rest_login'),
    url(r'^logout/$', LogoutView.as_view(), name='rest_logout'),
    url(r'^user/$', UserDetailsView.as_view(), name='user'),
]


# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    url(r'^auth/', include((rest_auth_urls, 'auth'), namespace='auth')),
    url(r'^items/', ItemsView.as_view(), name='Items'),
    url(r'^heatmap/', HeatMapView.as_view(), name='HeatMap'),
]
